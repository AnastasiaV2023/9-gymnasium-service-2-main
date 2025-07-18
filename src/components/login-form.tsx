import { useState } from "react"
import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { login } from "@/store/authSlice"
import { useNavigate } from "react-router"

/**
 * Форма логина пользователя.
 * Содержит поля email и пароль, а также кнопки для входа через соцсети.
 * Интегрирована с Redux для авторизации.
 */
const LoginForm = ({
                    className,
                    ...props
                  }: React.ComponentProps<"div">) => {
                    
  const dispatch = useAppDispatch();
  const { isAuthInProgress } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  // Обработчик отправки формы логина
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login({ email, password })).then(() => {
      navigate('/');
    })
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
              <span className="sr-only">Веб-сервис 9 гимназии</span>
            </a>
            <h1 className="text-xl font-bold">Добро пожаловать в 9 гимназию</h1>
            <div className="text-center text-sm">
              Нет аккаунта?{" "}
              <a href="/register" className="underline underline-offset-4">
                Зарегистрироваться
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
            <Button type="submit" className="w-full" disabled={isAuthInProgress}>
              {isAuthInProgress ? "Вход..." : "Войти"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
