import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/api/api.auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search, LogOut, Users, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { UserService } from "@/api/api.user";
import { logout } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";

interface User {
  id: number;
  fullName: string;
  graduationYear: number;
  classLetter: string;
  email: string;
  password: string;
  messageToGraduates: string;
  messageToStudents: string;
  occupation: string;
}

const pageSize = 20;

/**
 * Улучшенная страница со списком пользователей.
 * Включает поиск, фильтрацию, разные виды отображения и современный UI.
 */
const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [statusFilters, setStatusFilters] = useState({
    notAvailable: false,
    remote: false,
    ready: false,
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const isFirstRender = useRef(true);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      setPage(1);
      try {
        const response = await UserService.getUsersLazy({
          offset: 0,
          fullName: searchTerm,
          yearFrom: yearFrom ? Number(yearFrom) : undefined,
          yearTo: yearTo ? Number(yearTo) : undefined,
          classLetters: selectedLetters,
        });
        console.log(response);
        setUsers(response.data);
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error("Ошибка при загрузке пользователей", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, yearFrom, yearTo, JSON.stringify(selectedLetters)]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const response = await UserService.getUsersLazy({
          offset: pageSize * (page - 1),
          fullName: searchTerm,
          yearFrom: yearFrom ? Number(yearFrom) : undefined,
          yearTo: yearTo ? Number(yearTo) : undefined,
          classLetters: selectedLetters,
        });

        setUsers(response.data.users);
        setTotalUsers(response.data.total);
      } catch (error) {
        console.error("Ошибка при загрузке пользователей", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  if (loading) return (<div>Loading...</div>);

  // Получение уникальных ролей и отделов для фильтров
  const handleLetterChange = (letter: string) => {
    setSelectedLetters((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter]
    );
  };

  // const handleStatusChange = (status: keyof typeof statusFilters) => {
  //   setStatusFilters((prev) => ({
  //     ...prev,
  //     [status]: !prev[status],
  //   }));
  // };

  // Обработчик выхода
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Компонент карточки пользователя

  // Компонент строки таблицы
  const UserTableRow = ({ user }: { user: (typeof users)[0] }) => (
    <TableRow
      key={user.id}
      className="hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={() => navigate(`/users/${user.id}`)}
    >
      <TableCell>
        <div className="flex items-center space-x-3">
          {/* <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.fullName} />
            <AvatarFallback className="text-xs">
              {(user.fullName || '').split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar> */}
          <div>
            <div className="font-medium">{user.fullName}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {user.graduationYear && `Выпуск ${user.graduationYear}`}
        {user.classLetter && `, ${user.classLetter} класс`}
      </TableCell>
      {/* <TableCell>
        <Badge 
          variant={user.role === 'Выпускник' ? 'default' : user.role === 'Модератор' ? 'secondary' : 'outline'}
          className="text-xs"
        >
          {user.role}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={
          user.status === 'Готов помогать гимназии' ? 'text-green-600 border-green-200 bg-green-50' :
          user.status === 'Доступен для удаленной помощи' ? 'text-blue-600 border-blue-200 bg-blue-50' :
          'text-gray-600 border-gray-200 bg-gray-50'
          }
        >
          {user.status}
        </Badge>
      </TableCell>*/}
    </TableRow>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Пользователи</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Пользователи
              </h1>
              <p className="text-muted-foreground">
                Управление пользователями системы
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/account/${AuthService.getUserId()}`)}
              size="sm"
            >
              <User className="h-4 w-4 mr-2" />
              Аккаунт
            </Button>
            <Button variant="outline" onClick={handleLogout} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Поиск и фильтры</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Поиск по ФИО"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Фильтр по годам выпуска */}
              <div className="space-y-3">
                <label className="text-sm font-medium block mb-2">
                  Год выпуска
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="С"
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                  />
                  <span className="text-muted-foreground">—</span>
                  <Input
                    type="number"
                    placeholder="По"
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                  />
                </div>
              </div>

              {/* Фильтр по буквам класса */}
              <div className="space-y-3">
                <label className="text-sm font-medium block mb-2">
                  Буква класса
                </label>
                <div className="flex flex-wrap gap-3">
                  {["А", "Б", "В", "Г", "Д", "Е"].map((letter) => (
                    <div key={letter} className="flex items-center space-x-2">
                      <Checkbox
                        id={`letter-${letter}`}
                        checked={selectedLetters.includes(letter)}
                        onCheckedChange={() => handleLetterChange(letter)}
                      />
                      <label
                        htmlFor={`letter-${letter}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {letter}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Найдено {totalUsers} пользователей
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Users Display */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Пользователь</TableHead>
                <TableHead>Выпуск</TableHead>
                {/* <TableHead>Роль</TableHead>
                  <TableHead>Статус</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <UserTableRow key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </Card>

        {totalUsers > pageSize && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Страница {page} из {Math.ceil(totalUsers / pageSize)}
            </p>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Назад
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page * pageSize >= totalUsers}
              >
                Вперёд
              </Button>
            </div>
          </div>
        )}

        {users.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Пользователи не найдены</h3>
              <p className="text-muted-foreground text-center">
                Попробуйте изменить параметры поиска или фильтры
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setYearFrom("");
                  setYearTo("");
                  setSelectedLetters([]);
                  setStatusFilters({
                    notAvailable: false,
                    remote: false,
                    ready: false,
                  });
                }}
              >
                Сбросить фильтры
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
