function NavbarLink(props) {
  const isActive = props.history.location.pathname.endsWith(props.href)
  const activeClass = isActive ? ' active' : ''

  return (
    <a
      className={'nav-link user-select-none ps-4' + activeClass}
      onClick={() => (!isActive ? props.history.push(props.href, { profile: props.profile }) : false)}
    >
      <i className={props.icon + ' icons right align-middle'} />
      <span className="align-middle">{props.name}</span>
    </a>
  )
}

export default NavbarLink
