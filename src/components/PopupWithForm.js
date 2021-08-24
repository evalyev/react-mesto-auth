function PopupWithForm(props) {
  return (
    <article className={`popup popup_type_${props.name}` + (props.isOpen ? " popup_opened" : "")} onClick={props.onClose}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className={"popup__submit" + (props.name === "delete" ? " popup__submit_type_delete" : "")} type="submit">{props.btnText}</button>
        </form>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </article>
  )
}

export default PopupWithForm;