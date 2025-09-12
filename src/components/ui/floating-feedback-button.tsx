"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

const feedbackSchema = z.object({
  category: z.string().min(1, "Por favor, selecione uma categoria"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Por favor, insira um email válido"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

const feedbackCategories = [
  { value: "suggestion", label: "Sugestão" },
  { value: "bug", label: "Reportar Problema" },
  { value: "feature", label: "Nova Funcionalidade" },
  { value: "content", label: "Conteúdo" },
  { value: "general", label: "Geral" },
];

export function FloatingFeedbackButton() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      category: "",
      name: "",
      email: "",
      message: "",
    },
  });

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Clear form errors when closing
      form.clearErrors();
    }
  };

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "Feedback enviado!",
          description: "Obrigado pelo seu feedback. Entraremos em contato em breve.",
          variant: "success",
        });
        
        form.reset();
        setOpen(false);
      } else {
        throw new Error(result.message || 'Erro ao enviar feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Erro ao enviar feedback",
        description: error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 rounded-full w-10 h-10 shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white"
          size="icon"
          aria-label="Enviar feedback"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 md:w-96 p-0 bg-primary-foreground" 
        align="end" 
        side="top"
        sideOffset={10}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Enviar Feedback</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Category - Full width */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {feedbackCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Name and Email - 2 columns on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="seu@email.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Message - Full width */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva seu feedback, sugestão ou problema..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Feedback
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
