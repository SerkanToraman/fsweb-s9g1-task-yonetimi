import {useForm} from "react-hook-form"

const PeopleForm = ({ kisiler, submitFn }) => {
  const {register,handleSubmit,formState:{errors, isValid},reset,} = useForm({
    defaultValues : {
    isim:"",
  },
  mode:"all"
})

  // useEffect(() => {
  //   if (kisiler.includes(isim)) {
  //     setError("Bu isim daha önce eklenmiş")
  //   } else {
  //     setError(null)
  //   }
  // }, [isim, kisiler])


  function myhandleSubmit(data) {
    console.log(data);
    submitFn(data.isim);
    reset();
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(myhandleSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          İsim
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("isim",{
            required : "İsim yazmalısınız.",
            validate:{
              isimIncluded : deger =>  !kisiler.includes(deger) || "Bu isim daha önce eklenmiş"
            }
          })}
        />
          <p className="input-error">{errors?.isim?.message}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
