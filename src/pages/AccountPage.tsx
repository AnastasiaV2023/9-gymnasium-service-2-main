import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Mail, 
  Edit, 
  Save, 
  X, 
  Lock, 
  Shield, 
  Activity, 
  Settings, 
  User,
  Clock,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { users } from "@/const/users";

/**
 * Страница аккаунта текущего пользователя с возможностью редактирования.
 * Включает табы для профиля, активности и настроек с интегрированной функциональностью редактирования.
 */
const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Предполагаем, что первый пользователь - это текущий авторизованный пользователь
  const currentUser = users[0];

  // Состояние для редактирования профиля
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: currentUser.password,
    shareWithAlumni: currentUser.shareWithAlumni,
    shareWithStudents: currentUser.shareWithStudents,
    profession: currentUser.profession,
    year: currentUser.year,
    letter: currentUser.letter,
    status: currentUser.status,
    connection: currentUser.connection
  });

  // Состояние для смены пароля
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Моковые данные для активности
  const recentActivity = [
    { id: 1, action: 'Вход в систему', date: '2024-01-15 10:30', ip: '192.168.1.100' },
    { id: 2, action: 'Редактирование профиля', date: '2024-01-14 15:45', ip: '192.168.1.100' },
    { id: 3, action: 'Смена пароля', date: '2024-01-10 09:20', ip: '192.168.1.105' },
    { id: 4, action: 'Изменение настроек', date: '2024-01-08 14:15', ip: '192.168.1.100' },
    { id: 5, action: 'Вход в систему', date: '2024-01-08 09:00', ip: '192.168.1.100' },
  ];

  const handleProfileSave = () => {
    // Здесь будет логика сохранения через API
    console.log('Saving profile data:', profileData);
    setIsEditingProfile(false);
    toast.success('Профиль успешно обновлен');
  };

  const handleProfileCancel = () => {
    setProfileData({
      name: currentUser.name,
      email: currentUser.email,
      password: currentUser.password,
      shareWithAlumni: currentUser.shareWithAlumni,
      shareWithStudents: currentUser.shareWithStudents,
      profession: currentUser.profession,
      year: currentUser.year,
      letter: currentUser.letter,
      status: currentUser.status,
      connection: currentUser.connection
    });
    setIsEditingProfile(false);
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Пароль должен содержать минимум 6 символов');
      return;
    }
    // Здесь будет логика смены пароля через API
    console.log('Changing password');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditingPassword(false);
    toast.success('Пароль успешно изменен');
  };

  const handlePasswordCancel = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditingPassword(false);
  };

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
              <BreadcrumbPage>Мой аккаунт</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/users')} size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              К пользователям
            </Button>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Мой аккаунт</h1>
                <p className="text-muted-foreground flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {profileData.email}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={currentUser.role === 'Администратор' ? 'default' : currentUser.role === 'Модератор' ? 'secondary' : 'outline'}>
                    {currentUser.role}
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {currentUser.status}
                  </Badge>
                </div>
              </div>
            </div>
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
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Личная информация</span>
                    </CardTitle>
                    {!isEditingProfile && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setIsEditingProfile(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Редактировать
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditingProfile ? (
                    // Режим редактирования
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">ФИО</Label>
                        <Input 
                          id="name" 
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shareWithAlumni">Чем вы могли бы поделиться с выпускниками?</Label>
                        <Input 
                          id="shareWithAlumni" 
                          value={profileData.shareWithAlumni}
                          onChange={(e) => setProfileData({...profileData, shareWithAlumni: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shareWithStudents">Чем вы могли бы поделиться с учениками?</Label>
                        <Input 
                          id="shareWithStudents" 
                          value={profileData.shareWithStudents}
                          onChange={(e) => setProfileData({...profileData, shareWithStudents: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profession">Кем работаете?</Label>
                        <Input 
                          id="profession" 
                          value={profileData.profession}
                          onChange={(e) => setProfileData({...profileData, profession: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="connection">Как связаться?</Label>
                        <Input 
                          id="connection" 
                          value={profileData.connection}
                          onChange={(e) => setProfileData({...profileData, connection: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Статус готовности помочь</Label>
                        <Select  
                          value={profileData.status}
                          onValueChange={(value) => setProfileData({...profileData, status: value})}
                        >
                          <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Выберите статус" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='ready'>Готов помогать гимназии</SelectItem>
                            <SelectItem value='remote'>Доступен для удаленной помощи</SelectItem>
                            <SelectItem value='notAvailible'>Не доступен</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Пароль</Label>
                        <Input 
                          id="password" 
                          value={profileData.password}
                          onChange={(e) => setProfileData({...profileData, password: e.target.value})}
                        />
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button onClick={handleProfileSave} size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Сохранить
                        </Button>
                        <Button variant="outline" onClick={handleProfileCancel} size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Отмена
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Режим просмотра
                    <>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">ФИО:</span>
                        <span className="text-sm">{profileData.name}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground flex items-center">
                          Год выпуска:
                        </span>
                        <span className="text-sm">{profileData.year}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground flex items-center">
                          Буква класса:
                        </span>
                        <span className="text-sm">{profileData.letter}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground flex items-center">
                          Email:
                        </span>
                        <span className="text-sm">{profileData.email}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground flex items-center">
                          Пароль:
                        </span>
                        <span className="text-sm">{profileData.password}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Дополнительная информация</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground">Роль:</span>
                    <Badge variant={currentUser.role === 'Выпускник' ? 'default' : currentUser.role === 'Модератор' ? 'secondary' : 'outline'}>
                      {currentUser.role}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground">Статус готовности помочь:</span>
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      {currentUser.status}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                        Чем вы могли бы поделиться с выпускниками?:
                    </span>
                    <span className="text-sm">{profileData.shareWithAlumni}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                      Чем вы могли бы поделиться с учениками?:
                    </span>
                    <span className="text-sm">{profileData.shareWithStudents}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                      Кем работаете?:
                    </span>
                    <span className="text-sm">{profileData.profession}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                      Как связаться?:
                    </span>
                    <textarea className="text-sm"></textarea>
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
                  <span>История активности</span>
                </CardTitle>
                <CardDescription>
                  Ваша последняя активность в системе
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
                  <div className="flex items-center justify-between">
                    <CardTitle>Безопасность</CardTitle>
                    {!isEditingPassword && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setIsEditingPassword(true)}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Сменить пароль
                      </Button>
                    )}
                  </div>
                  <CardDescription>
                    Управление паролем и безопасностью аккаунта
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditingPassword ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Текущий пароль</Label>
                        <div className="relative">
                          <Input 
                            id="currentPassword" 
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Новый пароль</Label>
                        <div className="relative">
                          <Input 
                            id="newPassword" 
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                        <div className="relative">
                          <Input 
                            id="confirmPassword" 
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button onClick={handlePasswordSave} size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Сохранить
                        </Button>
                        <Button variant="outline" onClick={handlePasswordCancel} size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Отмена
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">Последняя смена:</span>
                        <span className="text-sm">10.01.2024</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">Двухфакторная аутентификация:</span>
                        <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                          Отключена
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Статистика аккаунта</CardTitle>
                  <CardDescription>
                    Информация о вашей активности
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
                  <Separator />
                  <div className="space-y-3 pt-2">
                    <Button className="w-full justify-start" variant="outline" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Завершить все сессии
                    </Button>
                    <Button className="w-full justify-start" variant="outline" size="sm">
                      <Activity className="h-4 w-4 mr-2" />
                      Экспорт данных
                    </Button>
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

export default AccountPage;