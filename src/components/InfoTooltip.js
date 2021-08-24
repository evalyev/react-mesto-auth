import React from "react";
import success from "../images/info__success.svg"
import fail from "../images/info__fail.svg"

export default function InfoTooltip(props) {


  return (
    <article className={`popup popup_type_${props.name}` + (props.isOpen ? " popup_opened" : "")} onClick={props.onClose}>
      <div className="popup__container">
        {
          props.isSuccess ? (
            <>
              <img className="popup__img-info-tooltip" src={success} />
              <p className="popup__text-info-tooltip">Вы успешно зарегистрировались!</p>
            </>
          ) : (
            <>
              <img className="popup__img-info-tooltip" src={fail} />
              <p className="popup__text-info-tooltip">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>
          )
        }
        < button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </article >
  )
}