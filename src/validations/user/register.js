import * as v from "valibot";
import expirationTimePattern from "../../regex/expirationTimePattern.js";

const RegisterSchema = v.object({
  fullName: v.pipe(
    v.string("لطفا نام و نام خانوادگی خود را وارد نمائید."),
    v.minLength(1, "لطفا نام و نام خانوادگی خود را وارد نمائید")
  ),
  password: v.pipe(
    v.trim(),
    v.nonEmpty(),
    v.string("لطفا گذرواژه خود را وارد نمائید."),
    v.minLength(8, "گذرواژه شما حداقل باید شامل 8 حروف باشد")
  ),
  email: v.optional(
    v.pipe(
      v.string(),
      v.email("لطفا پست الکترونیکی خود را به درستی وارد نمائید")
    )
  ),
  phoneNumber: v.required(
    v.pipe(
      v.string(),
      v.nonEmpty("لطفا شماره موبایل خود را وارد نمائید"),
      v.maxLength(11, "شماره موبایل نمی‌تواند بیشتر از 11 رقم باشد"),
      v.minLength(11, "شماره موبایل شما باید حداقل شامل 11 رقم باشد.")
    )
  ),
  systemOS: v.required(
    v.pipe(
      v.string("سیستم عامل کاربر به درستی تشخیص داده نشد"),
      v.nonEmpty("سیستم عامل کاربر به درستی تشخیص داده نشد")
    )
  ),
  tokenExpiration: v.optional(
    v.pipe(
      v.string("لطفا مدت زمان توکن را به درستی وارد نمائید."),
      v.minLength(2, "لطفا مدت زمان توکن را به درستی وارد نمائید."),
      v.regex(
        expirationTimePattern,
        "ساختار واردی مدت زمان توکن نامعتبر هست."
    )
    )
  ),
});

export default RegisterSchema;
