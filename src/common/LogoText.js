function LogoText(props) {
  return props.small ? (
    <h1 className={props.white ? 'display-logo small text-center text-white' : 'display-logo text-center pb-5'}>
      Lavalier
    </h1>
  ) : (
    <h1 className={props.white ? 'display-logo text-center pb-5 text-white' : 'display-logo text-center pb-5'}>
      Lavalier
    </h1>
  )
}

export default LogoText
