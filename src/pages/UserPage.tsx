import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Edit, 
  Lock, 
  MessageSquare, 
  UserX, 
  Shield, 
  Activity, 
  Settings, 
  User,
  Building,
  Clock,
  CheckCircle
} from "lucide-react";
import { users } from "@/const/users";

/**
 * Улучшенная страница профиля пользователя.
 * Включает табы, диалоги для действий, детальную информацию и современный UI.
 */
const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);

  // Находим пользователя по id из моковых данных
  const user = users.find(u => u.id === Number(id));

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Пользователь не найден</h2>
            <p className="text-muted-foreground mb-4">Запрашиваемый пользователь не существует в системе</p>
            <Button onClick={() => navigate('/users')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться к списку
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Моковые данные для активности
  const recentActivity = [
    { id: 1, action: 'Вход в систему', date: '2024-01-15 10:30', ip: '192.168.1.100' },
    { id: 2, action: 'Редактирование профиля', date: '2024-01-14 15:45', ip: '192.168.1.100' },
    { id: 3, action: 'Смена пароля', date: '2024-01-10 09:20', ip: '192.168.1.105' },
  ];

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
              <BreadcrumbLink href="/users">Пользователи</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{user.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/users')} size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {user.email}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={user.role === 'Администратор' ? 'default' : user.role === 'Модератор' ? 'secondary' : 'outline'}>
                    {user.role}
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Редактировать
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Редактирование профиля</DialogTitle>
                  <DialogDescription>
                    Изменение информации о пользователе {user.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={user.email} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Статус</Label>
                      <Select defaultValue={user.role}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Пользователь">Пользователь</SelectItem>
                          <SelectItem value="Модератор">Модератор</SelectItem>
                          <SelectItem value="Администратор">Администратор</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" defaultValue={user.phone} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={() => setIsEditDialogOpen(false)}>
                    Сохранить изменения
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Сообщение
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Отправить сообщение</DialogTitle>
                  <DialogDescription>
                    Сообщение для {user.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема</Label>
                    <Input id="subject" placeholder="Введите тему сообщения" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Введите текст сообщения..." 
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={() => setIsMessageDialogOpen(false)}>
                    Отправить
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Активность</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Настройки</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Личная информация</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                      Год выпуска:
                    </span>
                    <span className="text-sm">{user.year}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                      Буква класса:
                    </span>
                    <span className="text-sm">{user.letter}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                      Статус:
                    </span>
                    <span className="text-sm">{user.status}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Дата регистрации:
                    </span>
                    <span className="text-sm">{user.joinDate}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Роль и статус</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground">Роль:</span>
                    <Badge variant={user.role === 'Выпускник' ? 'default' : user.role === 'Модератор' ? 'secondary' : 'outline'}>
                      {user.role}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground">Статус:</span>
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      {user.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Последняя активность</span>
                </CardTitle>
                <CardDescription>
                  История действий пользователя в системе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">IP: {activity.ip}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Действия с аккаунтом</CardTitle>
                  <CardDescription>
                    Управление аккаунтом пользователя
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Сменить пароль
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Отправить уведомление
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Сбросить сессии
                  </Button>
                  <Separator />
                  <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full justify-start" variant="destructive">
                        <UserX className="h-4 w-4 mr-2" />
                        Заблокировать пользователя
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Подтверждение блокировки</DialogTitle>
                        <DialogDescription>
                          Вы уверены, что хотите заблокировать пользователя {user.name}? 
                          Это действие можно будет отменить позже.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="reason">Причина блокировки</Label>
                          <Textarea 
                            id="reason" 
                            placeholder="Укажите причину блокировки..."
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBlockDialogOpen(false)}>
                          Отмена
                        </Button>
                        <Button variant="destructive" onClick={() => setIsBlockDialogOpen(false)}>
                          Заблокировать
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Статистика</CardTitle>
                  <CardDescription>
                    Общая информация об активности
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Всего входов:</span>
                    <span className="text-sm font-bold">142</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Последний вход:</span>
                    <span className="text-sm">2024-01-15 10:30</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Время в системе:</span>
                    <span className="text-sm">1 год 2 месяца</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Статус сессии:</span>
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      Активна
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserPage; 