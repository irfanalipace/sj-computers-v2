import './Button.css'

export default function Button({children,clickHandler}) {

  useEffect(() => {
    clickHandler()
  }, []);

  return (
    <button className="button" onClick={clickHandler}>
        {children}
    </button>
  )
}
