import { useState } from "react"
import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppSelector } from "@/store/hooks"
// import { register } from "@/store/authSlice" // если будет регистрация через redux

/**
 * Форма регистрации пользователя.
 * Содержит поля email, пароль, подтверждение пароля.
 * Валидация совпадения паролей. Можно доработать для интеграции с API.
 */
export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // const dispatch = useAppDispatch(); // если понадобится для redux
  const { isAuthInProgress } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    // dispatch(register({ email, password }))
    // Здесь должен быть вызов регистрации через API
    alert(`Регистрация: ${email}`);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Gymnasium Service</span>
            </a>
            <h1 className="text-xl font-bold">Регистрация в Gymnasium Service</h1>
            <div className="text-center text-sm">
              Уже есть аккаунт?{" "}
              <a href="/login" className="underline underline-offset-4">
                Войти
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={isAuthInProgress}>
              {isAuthInProgress ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Регистрируясь, вы соглашаетесь с нашими <a href="#">Условиями использования</a>{" "}
        и <a href="#">Политикой конфиденциальности</a>.
      </div>
    </div>
  )
}

export default RegisterForm; 