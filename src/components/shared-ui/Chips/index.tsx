import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import useOnClickOutside from 'src/helpers/hooks/use-click-outside'

type Props = {
  className?: string
  name: SendMessageField
  setValue: (field: SendMessageField, value: any) => void
  data: SendMessageData
}

const isEmail = (email: string) => /[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/.test(email)

const Chips: React.FC<Props> = ({ setValue, name, data }) => {
  const currentFieldData: MessageList[] = data[name] as MessageList[]
  const [state, setState] = useState<{
    items: string[]
    value: string
    error: null | string
  }>({
    items: [],
    value: '',
    error: null,
  })
  const inputRef = useRef(null)
  useOnClickOutside(inputRef, () => {
    setInputValue()
  })

  const isInList = (email: string) =>
    currentFieldData.map((i) => i.address).includes(email)

  const isValid = (email: string) => {
    let error = null

    if (isInList(email)) {
      error = `${email} has already been added.`
    }

    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`
    }

    if (error) {
      setState({ ...state, error })

      return false
    }

    return true
  }

  const setInputValue = () => {
    const value = state.value.trim()

    if (value && isValid(value)) {
      setValue(name, [...currentFieldData, { address: value }])
      setState({
        ...state,
        value: '',
      })
    }
  }

  const handleKeyDown = (evt: any) => {
    if (['Enter', ','].includes(evt.key)) {
      evt.preventDefault()
      setInputValue()
    }

    if (['Backspace'].includes(evt.key) && state.value === '') {
      setValue(name, currentFieldData.slice(0, -1))
    }
  }

  const handleChange = (evt: any) => {
    setState({
      ...state,
      value: evt.target.value,
      error: null,
    })
  }

  const handleDelete = (item: any) => {
    setValue(
      name,
      currentFieldData.filter((i) => i.address !== item)
    )
  }

  return (
    <div className={classNames(s.container)}>
      {currentFieldData.map((item) => (
        <div className={s.tagItem} key={item.address}>
          {item.address}
          <button
            type="button"
            className={s.button}
            onClick={() => handleDelete(item.address)}
          >
            &times;
          </button>
        </div>
      ))}

      <input
        className={classNames(s.input, state.error && s.hasError)}
        value={state.value}
        placeholder=""
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />

      {state.error && <p className={s.error}>{state.error}</p>}
    </div>
  )
}

const s = css`
  .container {
    position: relative;

    display: flex;
    flex: 1 0 auto;
    align-items: center;
    flex-flow: row wrap;
  }

  .input {
    flex: 1 0 auto;
    box-sizing: border-box;
    border: none;
    color: var(--shades1);
    -webkit-appearance: none;
  }

  .input:focus {
    border-color: cornflowerblue;
    outline: none;
  }

  .input.hasError {
    border-color: tomato;
  }

  .error {
    margin: 0;
    font-size: 11px;
    color: tomato;
  }

  .tagItem {
    background-color: none;
    padding: 0 4px 0 4px;
    display: inline-flex;
    align-items: center;
    color: var(--primary1);
    border-radius: 30px;
    word-break: break-word;
  }

  .tagItem > .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    padding: 0;
    margin-left: 6px;

    background-color: white;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font: inherit;
    font-weight: bold;
    line-height: 1;
  }
`

export default Chips
