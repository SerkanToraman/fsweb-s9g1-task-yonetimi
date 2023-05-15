import React from 'react'
import {useForm} from "react-hook-form"
import { nanoid } from "nanoid";


export default function TaskHookForm({ kisiler, submitFn }) {

  const {register,handleSubmit,formState:{errors, isValid},reset,} = useForm({
      defaultValues : {
        id: 1,
        title:"",
        description:"",
        people: [""],
        deadline: "",
        status: "yapılacak",
    },
    mode:"all"
  })

  //validation'i input icinde degilde disinda da yazabilmek icin
  const textValidation = (fieldName)=>({
    required: `${fieldName} alanı boş bırakılamaz!`, minLength:{value:3,message:`${fieldName} en az 3 karakter olmalıdır.`}
})

  const mySubmit = data => {
    console.log(data);
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(mySubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title",textValidation("Başlık"))}
        />
        { errors.title && <div> {errors.title.message} </div> }
      </div>
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
          required:" Açıklama alanı boş bırakılamaz!",
          minLength:{
          value:10,
          message: "Açıklama en az 10 karakter olmalıdır."}
        }
        )}
        ></textarea>
         { errors.description && <div> {errors.description.message} </div> }
      </div>
      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people",{
                  required:"En az 1 isim seçiniz.",
                  validate:{
                    maxAccepted : peopleList => peopleList.length <3 || "En fazla 3 kişi seçebilirsiniz."
                  } 
                })}
              />
              {p}
            </label>
          ))}
        </div>
        { errors.people && <div> {errors.people.message} </div> }
      </div>
      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form>
  )
}
