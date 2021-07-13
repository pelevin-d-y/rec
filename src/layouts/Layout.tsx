import React, { useState } from 'react'
import Header from 'src/components/shared-ui/Header'
import Sidebar from 'src/components/shared-ui/Sidebar'
import { css } from 'astroturf'
import classNames from 'classnames'

type Props = {
  className?: string
}

const HomeLayout: React.FC<Props> = ({ children, className }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className={classNames(s.root, className, menuOpen && s.open)}>
      <div
        className={s.overlay}
        onClick={toggleMenu}
        onKeyDown={toggleMenu}
        role="button"
        tabIndex={0}
        aria-label="menu"
      />
      <Header toggleMenu={toggleMenu} />
      <div className={s.main}>
        <Sidebar
          className={s.sidebar}
          isOpen={menuOpen}
          toggleMenu={toggleMenu}
        />
        <div className={classNames(s.content)}>{children}</div>
      </div>
    </div>
  )
}

const sidebarWidth = 238

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .root {
    min-height: 100vh;
    padding-left: 39px;

    transition: all 0.2s ease-in;

    @include small-desktop {
      padding-left: 0;
    }
  }

  .root.open {
    padding-left: ${sidebarWidth}px;

    @include small-desktop {
      padding-left: 0;

      .overlay {
        display: block;
      }
    }

    .sidebar {
      transform: translateX(0);
    }
  }

  .main {
    width: 100%;
  }

  .open .sidebar {
    width: ${sidebarWidth}px;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;

    width: 39px;
    height: 100%;
    padding: 26px 0 15px 0;
    border-right: 1px solid #e4e0e0;

    transition: all 0.2s ease-in;

    @include small-desktop {
      z-index: 999;
      width: ${sidebarWidth}px;
      transform: translateX(-100%);
    }
  }

  .overlay {
    display: none;
    position: fixed;
    z-index: 998;
    width: 100%;
    height: 100%;
    background: var(--black);
    opacity: 0.5;
  }

  .content {
    max-width: 1400px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`

export default HomeLayout
