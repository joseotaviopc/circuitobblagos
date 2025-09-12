import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createFeedback } from '@/app/actions';

const feedbackSchema = z.object({
  category: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = feedbackSchema.parse(body);
    
    // Use the action function to create feedback
    const result = await createFeedback({
      category: validatedData.category,
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
    });
    
    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Feedback enviado com sucesso!' 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: result.error || 'Erro ao enviar feedback' 
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error processing feedback:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Dados inválidos', 
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}
