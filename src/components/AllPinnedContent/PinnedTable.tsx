/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import {
  Cell,
  Column,
  Row as RowTable,
  useFlexLayout,
  useRowSelect,
  useRowState,
  useSortBy,
  useTable,
} from 'react-table'
import Avatar from 'src/components/shared-ui/Avatar'
import PopoverUserInfo from 'src/components/shared-ui/popover/PopoverUserInfo'
import { useTable as useTableContext } from 'src/components/context/TableContext'
import { customSortType } from 'src/helpers/utils/custom-sort-table'
import { getName } from 'src/helpers/utils/get-name'
import Checkbox from '../shared-ui/Table/Checkbox'
import Row from '../shared-ui/Table/Row'
import Button from '../shared-ui/Button'
import SvgIcon from '../shared-ui/SvgIcon'
import Close from '../shared-ui/Close'
import CellLastMessage from '../shared-ui/Table/CellLastMessage'
import { HOCLastMessage } from '../HOCs/HOCLastMessage'
import NextStep from '../shared-ui/NextStep'
import { usePinned } from '../context/PinnedContext'

type Props = {
  className?: string
  data: any[]
}

const PinnedTable: React.FC<Props> = ({ className, data }) => {
  const { setState: setSelectedUsers } = useTableContext()
  const tableData = useMemo(() => data, [data])

  const { removePinned } = usePinned()

  const removePin = React.useCallback((row: RowTable<any>) => {
    row.setState({ isLoading: true })
    removePinned(row?.original.contact_id)
      .then(() => {
        row.setState({ isLoading: false })
      })
      .catch((err: any) => console.log('removePinned err ==>', err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Contact',
        accessor: 'name',
        width: 180,
        Cell: ({ row }: Cell<any>) => (
          <div className={s.cellName}>
            <Avatar
              className={s.avatar}
              name={getName(row.original)}
              image={row.original.image_url}
            />
            <div>
              <PopoverUserInfo className={s.name} data={row.original} />
            </div>
          </div>
        ),
        sortType: customSortType(),
      },
      {
        Header: 'Last Outreach',
        id: 'last-message',
        width: 250,
        Cell: ({ value, row }) => (
          <HOCLastMessage id={row.original.contact_id}>
            {(lastMessageData, isLoading, ref) => (
              <CellLastMessage
                isLoading={isLoading}
                lastMessageData={lastMessageData}
                ref={ref}
              />
            )}
          </HOCLastMessage>
        ),
        disableSortBy: true,
      },
      {
        Header: 'Next steps',
        id: 'Company',
        width: 250,
        Cell: ({ value, row }) => <NextStep data={row.original} />,
        disableSortBy: true,
      },
      {
        id: 'button',
        width: 130,
        Cell: () => (
          <div className={s.buttonWrapper}>
            <Button
              className={s.button}
              variant="outlined"
              handler={() => null}
            >
              Follow up
            </Button>
          </div>
        ),
      },
      {
        id: 'remove',
        width: 'fit-content',
        Cell: ({ row }) => (
          <div className={s.removeWrapper}>
            <Close
              className={s.close}
              handler={() => {
                removePin(row)
              }}
            />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    selectedFlatRows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: tableData || [],
    },
    useSortBy,
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
    setSelectedUsers(selectedFlatRows.map((item) => item.original as any))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows])

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
                  const { key: keyHeader } = column.getHeaderProps()
                  return (
                    <th
                      className={classNames(s.columnHeader, s[keyHeader])}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={keyHeader}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <SvgIcon className={s.sort} icon="sort.svg" />
                          ) : (
                            <SvgIcon
                              className={classNames(s.sort, s.sortAsc)}
                              icon="sort.svg"
                            />
                          )
                        ) : (
                          ''
                        )}
                      </span>
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
                classes={{ cell: s.cell }}
                key={key}
                {...restProps}
              />
            )
          })}
        </tbody>
      </table>
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
    padding-bottom: 36px;
  }

  .table {
    border-collapse: collapse;
    width: 100%;
    min-width: 400px !important;
  }

  .row:hover {
    background: var(--primary2);
  }

  .cellName {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-weight: var(--bold);
    word-break: break-word;
  }

  .avatar {
    font-size: 16px;
    flex: 0 0 auto;
    margin-right: 20px;
  }

  .cellContent {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    font-size: 12px;
    line-height: 14px;
  }

  .threadButton {
    font-size: 12px;
    line-height: 14px;
  }

  .cellHeaderAll {
    color: var(--primary1);
  }

  .cellCheckbox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .checkbox {
    background: var(--shades2);
  }

  .tbody tr {
    margin-bottom: 5px;
    box-shadow: 0px 1px 1px 0px #22222219;
    border-radius: 6px;

    &:hover {
      .close {
        opacity: 1;
      }
    }
  }

  .lastData {
    margin-bottom: 6px;
  }

  .buttonWrapper {
    display: flex;
    flex-flow: row nowrap;
  }

  .button {
    margin-left: auto;
    width: 122px;
  }

  .columnHeader {
    text-align: left;
    padding: 18px 19px;

    &:first-child {
      max-width: 55px !important;
    }

    &:last-child {
      max-width: none !important;
    }
  }

  .sort {
    margin-left: 3px;
  }
  .sortAsc {
    transform: scale(1, -1);
  }

  .close {
    background: transparent;
    color: #8e8e8e;
    opacity: 0;
  }
`

export default PinnedTable
