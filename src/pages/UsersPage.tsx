import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, LogOut, Users, Settings, User } from "lucide-react";
import { users } from "@/const/users";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Улучшенная страница со списком пользователей.
 * Включает поиск, фильтрацию, разные виды отображения и современный UI.
 */
const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [statusFilters, setStatusFilters] = useState({
    notAvailable: false,
    remote: false,
    ready: false,
  });

  // Фильтрация пользователей
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Поиск по ФИО
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Фильтр по году выпуска
      const graduationYear = user.year || 0;
      const matchesYearFrom = !yearFrom || graduationYear >= parseInt(yearFrom);
      const matchesYearTo = !yearTo || graduationYear <= parseInt(yearTo);
      
      // Фильтр по букве класса
      const matchesLetters = selectedLetters.length === 0 || 
                            (user.letter && selectedLetters.includes(user.letter));
      
      let matchesStatus = true;
      if (statusFilters.notAvailable || statusFilters.remote || statusFilters.ready) {
        matchesStatus = false;
        if (statusFilters.notAvailable && user.status === 'Не доступен') matchesStatus = true;
        if (statusFilters.remote && user.status === 'Доступен для удаленной помощи') matchesStatus = true;
        if (statusFilters.ready && user.status === 'Готов помогать гимназии') matchesStatus = true;
      }

      return matchesSearch && matchesYearFrom && matchesYearTo && matchesLetters && matchesStatus;
    });
  }, [searchTerm, yearFrom, yearTo, selectedLetters, statusFilters]);

  // Получение уникальных ролей и отделов для фильтров
  const handleLetterChange = (letter: string) => {
    setSelectedLetters(prev => 
      prev.includes(letter) 
        ? prev.filter(l => l !== letter) 
        : [...prev, letter]
    );
  };

  const handleStatusChange = (status: keyof typeof statusFilters) => {
    setStatusFilters(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  // Обработчик выхода
  const handleLogout = () => {
    localStorage.removeItem('access-token');
    navigate('/login');
  };

  // Компонент карточки пользователя


  // Компонент строки таблицы
  const UserTableRow = ({ user }: { user: typeof users[0] }) => (
    <TableRow 
      key={user.id}
      className="hover:bg-muted/50 cursor-pointer transition-colors" 
      onClick={() => navigate(`/users/${user.id}`)}
    >
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {user.year && `Выпуск ${user.year}`}
        {user.letter && `, ${user.letter} класс`}
      </TableCell>
      <TableCell>
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
      </TableCell>
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
              <h1 className="text-3xl font-bold text-foreground">Пользователи</h1>
              <p className="text-muted-foreground">Управление пользователями системы</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => navigate('/account')} size="sm">
              <User className="h-4 w-4 mr-2" />
              Аккаунт
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
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
                <label className="text-sm font-medium block mb-2">Год выпуска</label>
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
                <label className="text-sm font-medium block mb-2">Буква класса</label>
                <div className="flex flex-wrap gap-3">
                  {['А', 'Б', 'В', 'Г', 'Д', 'Е'].map(letter => (
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
              <div className="space-y-3">
                <label className="text-sm font-medium block mb-2">Статус</label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="status-not-available"
                      checked={statusFilters.notAvailable}
                      onCheckedChange={() => handleStatusChange('notAvailable')}
                    />
                    <label
                      htmlFor="status-not-available"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Не доступен
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="status-remote"
                      checked={statusFilters.remote}
                      onCheckedChange={() => handleStatusChange('remote')}
                    />
                    <label
                      htmlFor="status-remote"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Доступен для удаленной помощи
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="status-ready"
                      checked={statusFilters.ready}
                      onCheckedChange={() => handleStatusChange('ready')}
                    />
                    <label
                      htmlFor="status-ready"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Готов помогать гимназии
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Найдено {filteredUsers.length} из {users.length} пользователей
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
                  <TableHead>Роль</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <UserTableRow key={user.id} user={user} />
                ))}
              </TableBody>
            </Table>
          </Card>

        {filteredUsers.length === 0 && (
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
                  setSearchTerm('');
                  setYearFrom('');
                  setYearTo('');
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