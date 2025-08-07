import * as v from "valibot";

const LoginSchema = v.object({
  identifier: v.pipe(
    v.string("لطفا شماره موبایل یا ایمیل خود را وارد نمائید"),
    v.trim(),
    v.nonEmpty("لطفا شماره موبایل یا ایمیل خود را وارد نمائید"),
    v.union([
      v.pipe(
        v.string(),
        v.email("پست الکترونیکی شما نامعتبر است.")
      ),
      v.pipe(
        v.string(),
        v.regex(
          /^09[0-9]{9}$/,
          "شماره موبایل باید با 09 شروع شده و شامل ۱۱ رقم باشد."
        )
      )
    ], "لطفا شماره موبایل یا ایمیل معتبر وارد نمائید")
  ),
  password: v.pipe(
    v.string("لطفا گذرواژه خود را وارد نمائید"),
    v.nonEmpty("لطفا گذرواژه خود را وارد نمائید"),
    v.minLength(8, "گذرواژه شما حداقل باید شامل 8 کاراکتر باشد")
  )
});

export default LoginSchema;