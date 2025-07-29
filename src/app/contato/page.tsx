import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContatoPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight lg:text-5xl">
          Contato
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Fale conosco, tire suas dúvidas ou envie suas sugestões.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Envie uma Mensagem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea id="message" placeholder="Escreva sua mensagem aqui..." />
            </div>
            <Button className="w-full">Enviar Mensagem</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nossas Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg">
             <div className="flex items-start gap-4">
                <MapPin className="h-8 w-8 text-primary mt-1"/>
                <div>
                    <h3 className="font-semibold">Endereço</h3>
                    <p className="text-muted-foreground">Av. Litorânea, 1234 - Praia do Forte, Cabo Frio - RJ, 28900-000</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <Mail className="h-8 w-8 text-primary mt-1"/>
                <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">contato@bblagos.com.br</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Phone className="h-8 w-8 text-primary mt-1"/>
                <div>
                    <h3 className="font-semibold">Telefone</h3>
                    <p className="text-muted-foreground">(22) 99999-8888</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
