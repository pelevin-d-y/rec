import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import Popover from 'src/components/shared-ui/popover/PopoverBase'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import { css } from 'astroturf'

type Props = {
  className?: string
  variant: 'outlined' | 'contained'
  items?: {
    name: string
    handler: () => void
  }[]
}

const defaultItems = [
  {
    name: 'Manage',
    handler: () => null,
  },
  {
    name: 'Unsubscribe',
    handler: () => null,
  },
]

const PopoverDots: React.FC<Props> = ({ className, variant, items }) => {
  const popoverItems = items || defaultItems

  return (
    <Popover
      triggerElement={
        <Button className={className} variant={variant}>
          •••
        </Button>
      }
      popupContent={
        <CardContainer className={classNames(className, s.popup)}>
          <ul className={s.list}>
            {popoverItems?.map((item) => (
              <li className={s.item} key={item.name}>
                <button
                  type="button"
                  onClick={() => item.handler()}
                  className={s.popupButton}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </CardContainer>
      }
    />
  )
}

const s = css`
  .popup {
    padding: 6px 0;
    background: var(--shades2);
  }

  .list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .item {
    padding: 0 15px;

    &:last-child {
      .popupButton {
        border-bottom: none;
      }
    }
  }

  .popupButton {
    width: 100%;
    padding-top: 9px;
    padding-bottom: 9px;

    font-size: 12px;
    font-weight: var(--bold);
    text-align: left;
    background: var(--shades2);
    border: none;
    border-bottom: 1px solid var(--neutral5);
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`

export default PopoverDots
