import * as v from 'valibot'

const DeliveryDataSchema = v.object({
    name: v.required(v.pipe(v.string(), v.minLength(1, "فیلد عنوان اجباری می‌باشد")), "لطفا نام سرویس ارسال کننده را وارد نمائید ..."),
    estimatedDeliveryTime: v.required(v.pipe(v.string(), v.minLength(1, "لطفا زمان تخمینی ارسال را وارد نمائید.")),"لطفا زمان تخمینی ارسال را وارد نمائید."),
    isActive: v.optional(v.boolean()),
    cost: v.required(v.pipe(v.number("لطفا مبلغ را به درستی وارد نمائید"),v.minValue(10_000, "هزینه ارسال باید بیشتر از 5 رقم باشد", v.minLength(5, "هزینه ارسال نمی‌تواند کمتر از 5رقم باشد"))), "لطفا هزینه ارسال را وارد نمائید"),
    icon: v.optional(v.string())
})


export default DeliveryDataSchema