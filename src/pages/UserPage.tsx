import React, { useState, useEffect } from 'react';
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
  Edit, 
  Lock, 
  MessageSquare, 
  UserX, 
  Shield, 
  Activity, 
  Settings, 
  User,
  Clock,
  CheckCircle
} from "lucide-react";
/** import { users } from "@/const/users"; **/
import { UserService } from '@/api/api.user';

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

/**
 * Улучшенная страница профиля пользователя.
 * Включает табы, диалоги для действий, детальную информацию и современный UI.
 */
const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [users, setUsers] = useState<User[]>([])

  // Находим пользователя по id из моковых данных
  /**const user = users.find(u => u.id === Number(id));**/

  useEffect(() => {
      const fetchData = async () => {
        const response = await UserService.getAllUsers()
  
        return response
      }
      fetchData().then(res => setUsers(res.data))
    }, [])
  
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
              <BreadcrumbPage>{user.fullName}</BreadcrumbPage>
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
                <AvatarImage alt={user.fullName} />
                <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                  {user.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{user.fullName}</h1>
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
                    <span className="text-sm">{user.graduationYear}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                      Буква класса:
                    </span>
                    <span className="text-sm">{user.classLetter}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground">Роль:</span>
                    {/** <Badge variant={user.role === 'Выпускник' ? 'default' : user.role === 'Модератор' ? 'secondary' : 'outline'}>
                      {user.role}
                    </Badge> **/}
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground">Статус:</span>
                    {/** <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      {user.status}
                    </Badge> **/}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Дополнительная информация </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                      Чем вы могли бы поделиться с выпускниками?:
                    </span>
                    <span className="text-sm">{user.messageToGraduates}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                    Чем вы могли бы поделиться с учениками?:
                    </span>
                    <span className="text-sm">{user.messageToStudents}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                    Кем работаете?:
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

export default UserPage; 