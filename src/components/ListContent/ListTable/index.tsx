import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import {
  Column,
  useFlexLayout,
  useRowSelect,
  useRowState,
  useTable,
} from 'react-table'

import Avatar from 'src/components/shared-ui/Avatar'
import { useTable as useTableContext } from 'src/components/context/TableContext'
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { formatTime } from 'src/helpers/utils/parseTime'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import { post } from 'src/api'
import { formatDataForApi } from 'src/helpers/utils/format-data-to-api'
import EditField from 'src/components/shared-ui/EditField'
import AddUserView from '../../shared-ui/AddUserView'
import Row from '../../shared-ui/Table/Row'
import Close from '../../shared-ui/Close'
import Checkbox from '../../shared-ui/Table/Checkbox'

type Props = {
  className?: string
  data: ListData
}

const Table: React.FC<Props> = ({ className, data }) => {
  const { setState: setSelectedUsers } = useTableContext()
  const { removeUsers, getPlaylistData } = usePlaylist()
  const tableData = useMemo(() => data.contacts, [data.contacts])

  const updateUser = useCallback((userData: any) => {
    const { newValue, previousValue } = formatDataForApi(
      { Notes: userData.newNotes },
      { Notes: userData.Notes }
    )
    const body = {
      [userData.contact_id]: [...newValue, ...previousValue],
    }

    return post.postContactsMutable(body)
  }, [])

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Contact',
        accessor: 'name',
        minWidth: 180,
        Cell: ({ row }) => (
          <div className={s.cellName}>
            <Avatar
              className={s.avatar}
              image={row.original.avatar}
              strength={row.original.relationshipStrength}
            />{' '}
            <PopoverUserInfo
              className={s.name}
              data={row.original}
              template={row.original.templateData}
            />
          </div>
        ),
      },
      // {
      //   Header: 'Title',
      //   Cell: ({ value }) => <span className={s.cellContent}>Placeholder</span>,
      // },
      // {
      //   Header: 'Company',
      //   Cell: ({ value, row }) => (
      //     <div className={s.cellContent}>Placeholder</div>
      //   ),
      // },
      {
        Header: 'Last outreach',
        accessor: 'last_client_text',
        maxWidth: 100,
        Cell: ({ value, row }) => (
          <div className={s.cellContent}>
            <div className={s.lastMessage}>Last message</div>
            <div className={s.lastData}>
              {formatTime(row.original.last_client_time)}
            </div>
            {/* <div>
              Hi Hailey, Did get a chance to view the deck i sent ove...
            </div> */}
          </div>
        ),
      },
      {
        Header: 'Next steps',
        minWidth: 250,
        Cell: ({ value, row }) => (
          <div className={classNames(s.cellContent)}>
            <div className={s.nextSteps}>
                ...
            </div>
          </div>
        ),
      },

      {
        Header: 'Notes',
        accessor: 'Notes',
        Cell: ({ value, row }) => {
          const [currentValue, setCurrentValue] = useState(value)

          return (
            <EditField
              type="text"
              value={currentValue}
              onSave={(val: string) => {
                setCurrentValue(val)
                updateUser({
                  ...row.original,
                  newNotes: val,
                }).catch(() => setCurrentValue(currentValue))
              }}
            />
          )
        },
      },
    ],
    [updateUser]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: tableData || [],
    },
    useFlexLayout,
    useRowSelect,
    useRowState,
    (hooks) => {
      hooks.visibleColumns.push((hookColumns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div className={s.headerCheckbox}>
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }: any) => (
            <div className={s.cellCheckbox}>
              <Checkbox {...row.getToggleRowSelectedProps()} />{' '}
            </div>
          ),
        },
        ...hookColumns,
      ])
    }
  )

  useEffect(() => {
    setSelectedUsers(
      selectedFlatRows.map(
        (item) => item.original as UserData | FormattedContact
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows])

  const removeUser = useCallback(
    async (e: React.MouseEvent, userData: any) => {
      e.stopPropagation()
      await removeUsers(data.id, [userData])
      await getPlaylistData(data.id)
    },
    [getPlaylistData, removeUsers, data.id]
  )

  return (
    <div className={s.container}>
      <table className={classNames(className, s.table)} {...getTableProps()}>
        <thead className={s.thead}>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps()
            return (
              <tr {...restHeaderGroupProps} className={s.tableRow} key={key}>
                {headerGroup.headers.map((column) => {
                  const { key: keyHeader, ...restHeaderProps } =
                    column.getHeaderProps()
                  return (
                    <th
                      className={classNames(s.columnHeader, s[keyHeader])}
                      {...restHeaderProps}
                      key={keyHeader}
                    >
                      {column.render('Header')}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody className={s.tbody} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            const { key, ...restProps } = row.getRowProps()

            return (
              <Row
                row={row}
                classes={{ container: s.tableRow }}
                key={key}
                {...restProps}
              >
                <td className={s.removeButton}>
                  <Close
                    handler={(e: React.MouseEvent) => {
                      row.setState({ isLoading: true })
                      removeUser(e, row.original).then(() => {
                        row.setState({ ...row.state, isLoading: false })
                      })
                    }}
                  />
                </td>
              </Row>
            )
          })}
        </tbody>
      </table>
      <div className={s.emptyCardContainer}>
        {rows.length === 0 && (
          <CardContainer className={classNames(className, s.emptyCard)}>
            <div className={s.cardLogo}>
              <SvgIcon className={s.logo} icon="contacts.svg" />
            </div>
            <div className={s.cardHeader}>Start creating your list</div>
            <AddUserView className={s.addUserView} listId={data.id} />
          </CardContainer>
        )}
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    width: 100%;
    overflow: auto;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
  }

  .table {
    border-collapse: collapse;
    width: 100%;
  }

  .columnHeader {
    text-align: left;
    padding: 18px 19px;
    font-size: 12px;

    &:first-child {
      max-width: 55px !important;
    }
  }

  .tableRow {
    padding-right: 50px;

    &:hover {
      .removeButton {
        opacity: 1;
      }
    }
  }

  .headerButton {
    opacity: 0;
    pointer-events: none;
  }

  .headerCheckbox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    width: 100%;
  }

  .row:hover {
    background: var(--lightBlue);
  }

  .header_All {
    color: var(--blue);
  }

  .emptyCardContainer {
    margin-top: 50px;
    margin-bottom: 90px;
  }

  .cellName {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .nextSteps {
    padding: 8px 12px;

    font-size: 11px;
    line-height: 13px;
    background: #fafafa;
  }

  .avatar {
    flex: 0 0 auto;
    margin-right: 20px;
  }

  .cellContent {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cellHeaderAll {
    color: var(--blue);
  }

  .cellCheckbox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .tbody tr {
    margin-bottom: 5px;

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);
    border-radius: 6px;
  }

  .lastData {
    margin-bottom: 6px;

    font-size: 12px;
    line-height: 14px;
    color: #adadad;
  }

  .lastMessage {
    font-size: 12px;
    line-height: 14px;
  }

  .cardHeader {
    font-size: 22px;
    font-weight: 700;
    line-height: 42px;
    text-align: center;
    margin-bottom: 30px;
  }

  .emptyCardContainer {
    display: flex;
    justify-content: center;
  }

  .emptyCard {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 54px 0;
    width: 80%;
  }

  .cardLogo {
    width: 162px;
    height: 162px;
    border-radius: 50%;
    background: #f0f5ff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 13px;

    @include mobile {
      width: 100px;
      height: 100px;
    }
  }

  .removeButton {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    opacity: 0;
  }

  .logo {
    width: 58px;
    height: 58px;
    color: #1966ff;

    @include mobile {
      width: 35px;
      height: 35px;
    }
  }

  .addUserView {
    max-width: 326px;
    width: 100%;
    box-shadow: none;
    padding: 8px;
  }
`

export default Table