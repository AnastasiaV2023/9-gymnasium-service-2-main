import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, type Resolver } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// Схема валидации
const schema = yup.object().shape({
  name: yup
    .string()
    .required("ФИО обязательно")
    .max(100, "Максимум 100 символов")
    .matches(/^[А-ЯЁа-яё\s]+$/, "Только русские буквы и пробелы"),
  year: yup
    .number()
    .typeError("Год должен быть числом")
    .integer("Год должен быть целым числом")
    .required("Год выпуска обязателен")
    .min(1930, "Минимальный год - 1930")
    .max(new Date().getFullYear(), `Максимальный год - ${new Date().getFullYear()}`),
  letter: yup
    .string()
    .oneOf(["А", "Б", "В", "Г", "Д", "Е"], "Выберите букву класса")
    .required("Буква класса обязательна"),
  shareWithAlumni: yup.string().max(1000, "Максимум 1000 символов").notRequired(),
  shareWithStudents: yup.string().max(1000, "Максимум 1000 символов").notRequired(),
  profession: yup.string().max(1000, "Максимум 1000 символов").notRequired(),
  email: yup
    .string()
    .required("Email обязателен")
    .email("Некорректный email")
    .max(100, "Максимум 100 символов"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(8, "Минимум 8 символов")
    .max(100, "Максимум 100 символов"),
})

type FormData = yup.InferType<typeof schema>

const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: {
      name: "",
      year: undefined,
      letter: "А",
      shareWithAlumni: "",
      shareWithStudents: "",
      profession: "",
      email: "",
      password: ""
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [submitSuccess])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      console.log(data)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitSuccess(true)
      reset()
    } catch (error) {
      setSubmitError("Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const letterValue = watch("letter")

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">Анкета выпускника</h1>
            <div className="text-center text-sm">
              Заполните анкету, чтобы оставаться в сообществе выпускников
            </div>
          </div>

          {submitSuccess && (
            <div className="bg-green-100 text-green-700 p-4 rounded-md text-center">
              Форма успешно отправлена!
            </div>
          )}

          {submitError && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
              {submitError}
            </div>
          )}

          <div className="flex flex-col gap-6">
            {/* ФИО */}
            <div className="grid gap-3">
              <Label htmlFor="fullName">ФИО*</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Иванов Иван Иванович"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Год выпуска и буква класса */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-3">
                <Label htmlFor="graduationYear">Год выпуска*</Label>
                <Input
                  id="year"
                  type="number"
                  {...register("year", { valueAsNumber: true })}
                  placeholder="2000"
                  className={errors.year ? "border-red-500" : ""}
                />
                {errors.year && (
                  <p className="text-sm text-red-600">{errors.year.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="letter">Буква класса*</Label>
                <Select
                  value={letterValue}
                  onValueChange={(value: NonNullable<"А" | "Б" | "В" | "Г" | "Д" | "Е" | undefined>) =>
                    setValue("letter", value)
              }
                >
                  <SelectTrigger className={errors.letter ? "border-red-500" : ""}>
                    <SelectValue placeholder="Выберите букву" />
                  </SelectTrigger>
                  <SelectContent>
                    {['А', 'Б', 'В', 'Г', 'Д', 'Е'].map(letter => (
                      <SelectItem key={letter} value={letter}>{letter}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.letter && (
                  <p className="text-sm text-red-600">{errors.letter.message}</p>
                )}
              </div>
            </div>

            {/* Многострочные текстовые поля */}
            {[
              { name: 'shareWithAlumni', label: 'Чем вы могли бы поделиться с выпускниками' },
              { name: 'shareWithStudents', label: 'Чем вы могли бы поделиться с учениками' },
              { name: 'profession', label: 'Кем работаете? Чем занимаетесь? Профессия?' },
            ].map((field) => (
              <div className="grid gap-3" key={field.name}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Textarea
                  id={field.name}
                  {...register(field.name as keyof FormData)}
                  rows={4}
                  placeholder="Ваш ответ..."
                  className={errors[field.name as keyof FormData] ? "border-red-500" : ""}
                />
                {errors[field.name as keyof FormData] && (
                  <p className="text-sm text-red-600">
                    {errors[field.name as keyof FormData]?.message}
                  </p>
                )}
              </div>
            ))}

            {/* Email и пароль */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-3">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="email@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Пароль*</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Не менее 8 символов"
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить анкету"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm