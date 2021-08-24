function ImagePopup(props) {
  return (
    <article className={"popup popup_type_card" + (props.isOpen ? " popup_opened" : "")} onClick={props.onClose}>
        <div className="popup__container">
          <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
          <h2 className="popup__card-title">{props.card?.name}</h2>
          <button className="popup__close" type="button" onClick={props.onClose}></button>
        </div>
      </article>
  )
}

export default ImagePopup;