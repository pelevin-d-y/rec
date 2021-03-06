/* eslint-disable camelcase */
import React, { useCallback, useEffect, useReducer } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Button from 'src/components/shared-ui/Button'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import EditorActions from 'src/components/shared-ui/EditorActions'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import { useClient } from 'src/components/context/ClientContext'
import parseMessage from 'src/helpers/utils/parse-message'
import { usePopup } from 'src/components/context/PopupContext'
import { post } from 'src/api'
import { getName } from 'src/helpers/utils/get-name'
import { useTemplates } from 'src/components/context/TemplatesContext'
import ModalEditorHeader from './EditorHeader'
import ModalHtmlEditor from './HtmlEditor'

type Props = {
  className?: string
  data: RecommendationUser | FormattedContact
  setIsSent: (val: boolean) => void
}

type Action =
  | { type: 'updateBody'; payload: SendMessageData }
  | { type: 'updateSendingStatus' }
  | { type: 'updateRequestStatus'; payload: boolean }

type State = {
  bodyData: SendMessageData
  error: string
  isSending: boolean
}

const initialState = {
  bodyData: {
    from_contact: '',
    body: '',
    to_contact_list: [],
    cc_contact_list: [],
    bcc_contact_list: [],
    reply_to_contact_list: [],
  },
  error: '',
  isSending: false,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'updateBody':
      return {
        ...state,
        bodyData: {
          ...state.bodyData,
          ...action.payload,
        },
      }
    case 'updateSendingStatus':
      return {
        ...state,
        isSending: !state.isSending,
      }
    default:
      return initialState
  }
}

const getAddressTo = (data: any) => {
  const primaryEmail =
    data?.address ||
    data?.emails?.find(
      (item: ContactMutable) =>
        item.type === 'email' && item.meta.type === 'primary'
    )?.data ||
    data?.emails[0]?.data ||
    ''

  return data?.address || primaryEmail
}

const MessageManager: React.FC<Props> = ({ className, data, setIsSent }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { state: clientState, removeContactRecommendation } = useClient()
  const { state: popupState, dispatch: popupDispatch } = usePopup()
  const { getTemplate } = useTemplates()

  const { dataMulti, data: composeData } = popupState

  const currentTemplate = getTemplate(composeData || undefined)

  const clientName =
    (clientState.data && clientState.data.name_short) ||
    (clientState.data && getName(clientState.data))
  const contactName = data.name_short || getName(data)

  const addressTo = getAddressTo(data)

  useEffect(() => {
    let parsedMessage
    if (currentTemplate && clientName && contactName) {
      parsedMessage = parseMessage(
        currentTemplate.body,
        contactName.split(' ')[0],
        clientName
      )
    }
    setValue('body', parsedMessage)
  }, [contactName, currentTemplate, clientState, clientName])

  const getPrimaryEmail = () => {
    if (clientState.data?.primaryEmail?.data) {
      return clientState.data?.primaryEmail?.data as string
    }
    return clientState.data?.syncedEmails &&
      clientState.data?.syncedEmails.length > 0
      ? clientState.data?.syncedEmails[0]
      : undefined
  }

  const getSubject = useCallback(() => {
    return currentTemplate?.subject
  }, [currentTemplate?.subject])

  // effect to set default value
  useEffect(() => {
    dispatch({
      type: 'updateBody',
      payload: {
        from_contact: getPrimaryEmail(),
        subject: getSubject(),
        to_contact_list: addressTo
          ? [
              {
                address: addressTo || '',
                name: contactName || '',
              },
            ]
          : [],
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressTo, contactName, clientState.data?.syncedEmails])

  // effect to update subject if template is changed
  useEffect(() => {
    dispatch({
      type: 'updateBody',
      payload: {
        subject: getSubject(),
      },
    })
  }, [getSubject])

  const setConnectedUser = () => {
    const updatedUsers = dataMulti?.map((item) => {
      if (item.contact_id === data.contact_id) {
        return {
          ...item,
          isSent: true,
        }
      }
      return item
    })

    if (updatedUsers) {
      popupDispatch({
        type: 'UPDATE_COMPOSE_MULTI_DATA',
        payload: updatedUsers as any,
      })
    }
  }

  useEffect(() => {
    const nextContact = (dataMulti as Array<any>)?.find(
      (item: any) => !item.isSent
    )
    if (nextContact) {
      process.nextTick(() => {
        popupDispatch({
          type: 'UPDATE_POPUP_DATA',
          payload: nextContact,
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMulti, popupDispatch])

  const removeRecommendation = () => {
    removeContactRecommendation(data.contact_id)
  }

  const sendEmail = () => {
    if (!state.bodyData.from_contact) {
      // eslint-disable-next-line no-alert
      return alert('Please set primary email')
    }

    dispatch({ type: 'updateSendingStatus' })

    return post
      .sendMessage(state.bodyData)
      .then(() => {
        dispatch({ type: 'updateSendingStatus' })
        setConnectedUser()
        setIsSent(true)
        removeRecommendation()
      })
      .catch((err) => {
        dispatch({ type: 'updateSendingStatus' })
        // eslint-disable-next-line no-alert
        alert(err)
      })
  }

  const setValue = (field: SendMessageField, value: any) => {
    dispatch({
      type: 'updateBody',
      payload: {
        [field]: value,
      },
    })
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <>
        {data && (
          <ModalEditorHeader
            data={state.bodyData}
            name={data.name_short || getName(data)}
            setValue={setValue}
          />
        )}
        <ModalHtmlEditor
          className={s.editor}
          value={state.bodyData.body}
          setEditorValue={setValue}
        />
        <div className={s.buttons}>
          {data && <EditorActions className={s.editorActions} />}
          <Button
            variant="contained"
            className={classNames(s.buttonSend, state.isSending && s.disabled)}
            handler={sendEmail}
          >
            {state.isSending ? (
              <SvgIcon className={s.spinner} icon="spinner.svg" />
            ) : (
              'Send'
            )}
          </Button>
        </div>
      </>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 0 0 23px;

    border: 1px solid #f1f1f1;
    border-top: none;
  }

  .editor {
    width: 100%;
    min-height: 220px;
    margin-top: 18px;
    margin-bottom: 25px;
    padding-left: 23px;
    padding-right: 25px;
    outline: none;
    border: none;
    resize: none;

    @include mobile {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  .editorActions {
    margin-right: auto;

    @include mobile {
      margin-bottom: 10px;
    }
  }

  .buttons {
    display: flex;
    flex-flow: row wrap;

    padding-left: 23px;
    padding-right: 25px;
    text-align: right;

    @include mobile {
      flex-flow: column nowrap;
    }
  }

  .buttonTemplate {
    margin-right: 10px;
    max-width: 140px;
    width: 100%;

    @include mobile {
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 10px;
    }
  }

  .buttonSend {
    position: relative;
    max-width: 140px;
    width: 100%;

    color: var(--shades2);

    &:hover {
      color: var(-blue);
    }

    @include mobile {
      margin-right: auto;
      margin-left: auto;
    }
  }

  .spinner {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .disabled {
    pointer-events: none;
  }
`

export default MessageManager
