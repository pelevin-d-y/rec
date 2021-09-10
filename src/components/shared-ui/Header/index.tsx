import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Search from 'src/components/shared-ui/Search'
import PopoverNotifications from 'src/components/shared-ui/popover/PopoverNotifications'
import { useClient } from 'src/components/context/ClientContext'
import HeaderProfile from './HeaderProfile'

type Props = {
  toggleMenu: () => void
  className?: string
}

const Header: React.FC<Props> = ({ toggleMenu, className }) => {
  const { state } = useClient()

  return (
    <header className={classNames(s.header, className)}>
      <div className={classNames(s.container)}>
        <button type="button" className={s.menu} onClick={toggleMenu}>
          <SvgIcon icon="menu.svg" />
        </button>
        <div className={s.text}>
          <span className={s.greeting}>Welcome to your Dashboard, &nbsp;</span>
          {state?.fullName}
        </div>
        <Search
          classes={{ container: s.search }}
          inputPlaceholder="Search..."
        />
        {state?.emails && <HeaderProfile className={s.profile} />}
        {/* <PopoverNotifications /> */}
      </div>
    </header>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .header {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    right: 0;
    padding-top: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--grey);
    background: var(--white);
  }

  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding-left: 14px;
    padding-right: 14px;
    margin-left: auto;
    margin-right: auto;

    @include small-desktop {
      flex-flow: row wrap;
    }
  }

  .search {
    max-width: 202px;
    width: 100%;
    margin-left: 18px;

    @include tablet {
      display: none;
    }
  }

  .theme {
    @include tablet {
      display: none;
    }
  }

  .toDos {
    @include tablet {
      display: none;
    }
  }

  .text {
    margin-left: 18px;

    font-weight: var(--semibold);
    @include tablet {
      display: none;
    }
  }

  .profile {
    @include mobile {
      margin-left: auto;
    }
  }

  .menu {
    border: none;
    background: none;
    cursor: pointer;
  }

  .greeting {
    color: #c1c1c1;
  }

  .search {
    margin-left: auto;
    margin-right: 12px;
  }
`

export default Header
