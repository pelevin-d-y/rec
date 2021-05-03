import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { css } from 'astroturf'

type Props = {
  className?: string
  link: string
}

const ShareLink: React.FC<Props> = ({ className, link }) => (
  <div className={classNames(className, s.container)}>
    <Link href={link}>
      <a>{link}</a>
    </Link>
    <button
      type="button"
      className={s.button}
      onClick={() => navigator.clipboard.writeText(link)}
    >
      <img
        alt="copy"
        className={s.copyImage}
        src={require('public/images/copy.png')}
      />
    </button>
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    max-width: 279px;
    width: 100%;
    padding: 13px;
    padding-left: 22px;

    background: #f3f3f3;
    color: var(--blue);

    a {
      color: var(--blue);
      text-decoration: none;
    }
  }

  .button {
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
  }

  .copyImage {
    display: block;
  }
`

export default ShareLink
