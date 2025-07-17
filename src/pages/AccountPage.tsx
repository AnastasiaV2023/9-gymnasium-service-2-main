import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Mail, 
  Edit, 
  Save, 
  X, 
  Shield,  
  User,
  CheckCircle,
} from "lucide-react";
import { UserService } from '@/api/api.user';

interface User {
  id: number;
  fullName: string;
  graduationYear: number;
  classLetter: string;
  email: string;
  messageToGraduates: string;
  messageToStudents: string;
  occupation: string;
  status?: string;
  role?: string;
}

const AccountPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  // Состояние для редактирования профиля
  /**const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    graduationYear: 0,
    classLetter: '',
    messageToGraduates: '',
    messageToStudents: '',
    occupation: '',
    status: '',
  });**/

  // Загрузка всех пользователей
  useEffect(() => {
      const fetchData = async () => {
        const response = await UserService.getAllUsers()
        
        return response
      }
      fetchData().then(res => setUsers(res.data))
    }, [])

  // Находим нужного пользователя
  const user = users.find(u => u.id === Number(id));

  // Инициализация данных профиля
  /**useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName,
        email: user.email,
        graduationYear: user.graduationYear,
        classLetter: user.classLetter,
        messageToGraduates: user.messageToGraduates,
        messageToStudents: user.messageToStudents,
        occupation: user.occupation,
        status: user.status || ''
      });
    }
  }, [user]); **/

  /**const handleProfileSave = async () => {
    try {
      if (!user) return;
      
      const updatedUser = {
        ...user,
        ...profileData
      };

      const response = await UserService.updateUser(user.id, updatedUser);
      
      // Обновляем локальный список пользователей
      setUsers(prev => prev.map(u => 
        u.id === user.id ? response.data : u
      ));
      
      setIsEditingProfile(false);
      toast.success('Профиль успешно обновлен');
    } catch (err) {
      toast.error('Ошибка при обновлении профиля');
      console.error(err);
    }
  };
**/
  /**const handleProfileCancel = () => {
    if (user) {
      setProfileData({
        fullName: user.fullName,
        email: user.email,
        graduationYear: user.graduationYear,
        classLetter: user.classLetter,
        messageToGraduates: user.messageToGraduates,
        messageToStudents: user.messageToStudents,
        occupation: user.occupation,
        status: user.status || ''
      });
    }
    setIsEditingProfile(false);
  };**/

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ошибка</h2>
            <p className="text-muted-foreground mb-4">{'Пользователь не найден'}</p>
            <Button onClick={() => navigate('/users')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться к списку
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
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

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/users')} size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              К пользователям
            </Button>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                <AvatarImage alt={user.fullName} />
                <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                  {user.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Мой аккаунт</h1>
                <p className="text-muted-foreground flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {user.email}
                </p>
                {user.role && (
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={user.role === 'Администратор' ? 'default' : user.role === 'Модератор' ? 'secondary' : 'outline'}>
                      {user.role}
                    </Badge>
                    {user.status && (
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {user.status}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Профиль</span>
            </TabsTrigger>
          </TabsList>

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
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">ФИО</Label>
                        {/**<Input 
                          id="fullName" 
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        />**/}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="graduationYear">Год выпуска</Label>
                        {/**<Input 
                          id="graduationYear" 
                          type="number"
                          value={profileData.graduationYear}
                          onChange={(e) => setProfileData({...profileData, graduationYear: Number(e.target.value)})}
                        />**/}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="classLetter">Буква класса</Label>
                        {/**<Input 
                          id="classLetter" 
                          value={profileData.classLetter}
                          onChange={(e) => setProfileData({...profileData, classLetter: e.target.value})}
                        />**/}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="messageToGraduates">Чем поделиться с выпускниками</Label>
                        {/**<Input 
                          id="messageToGraduates" 
                          value={profileData.messageToGraduates}
                          onChange={(e) => setProfileData({...profileData, messageToGraduates: e.target.value})}
                        />**/}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="messageToStudents">Чем поделиться с учениками</Label>
                        {/**<Input 
                          id="messageToStudents" 
                          value={profileData.messageToStudents}
                          onChange={(e) => setProfileData({...profileData, messageToStudents: e.target.value})}
                        />**/}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Профессия</Label>
                        {/**<Input 
                          id="occupation" 
                          value={profileData.occupation}
                          onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                        />**/}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Статус</Label>
                        {/**<Select
                          value={profileData.status}
                          onValueChange={(value) => setProfileData({...profileData, status: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите статус" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Готов помогать">Готов помогать</SelectItem>
                            <SelectItem value="Доступен удаленно">Доступен удаленно</SelectItem>
                            <SelectItem value="Не доступен">Не доступен</SelectItem>
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
                        />**/}
                      </div>
                      <div className="flex space-x-2 pt-2">
                        {/**<Button onClick={handleProfileSave} size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Сохранить
                        </Button>
                        <Button variant="outline" onClick={handleProfileCancel} size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Отмена
                        </Button>**/}
                        </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">ФИО:</span>
                        <span className="text-sm">{user.fullName}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">Год выпуска:</span>
                        <span className="text-sm">{user.graduationYear}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">Буква класса:</span>
                        <span className="text-sm">{user.classLetter}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">Email:</span>
                        <span className="text-sm">{user.email}</span>
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
                  {user.role && (
                    <>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">Роль:</span>
                        <Badge variant={user.role === 'Администратор' ? 'default' : user.role === 'Модератор' ? 'secondary' : 'outline'}>
                          {user.role}
                        </Badge>
                      </div>
                      <Separator />
                    </>
                  )}
                  {user.status && (
                    <>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">Статус:</span>
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                          {user.status}
                        </Badge>
                      </div>
                      <Separator />
                    </>
                  )}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Чем поделиться с выпускниками:
                    </span>
                    <span className="text-sm">{user.messageToGraduates}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Чем поделиться с учениками:
                    </span>
                    <span className="text-sm">{user.messageToStudents}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Профессия:
                    </span>
                    <span className="text-sm">{user.occupation}</span>
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