"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";

// Yeni bir "todo" oluşturmak için form verilerini alan fonksiyon
export async function create(formData: FormData) {
  // Form verilerinden "input" adındaki değeri alıp string olarak alıyoruz
  const input = formData.get("input") as string;

  // Eğer "input" boş bir string veya sadece boşluklardan oluşuyorsa, işlemi sonlandırır ve geri döner
  if (!input.trim()) {
    return;
  }

  // Yeni "todo"yu veritabanına ekler
  await prisma.todo.create({
    data: {
      title: input,
    },
  });

  // Veriyi yenilemek veya güncellemek için Next.js'te "/"" yolunu yeniden getirir
  revalidatePath("/");
}

// Bir "todo"yu düzenlemek için form verilerini alan fonksiyon
export async function edit(formData: FormData) {
  // Form verilerinden "newTitle" ve "inputId" adındaki değerleri alıp string olarak alıyoruz
  const input = formData.get("newTitle") as string;
  const inputId = formData.get("inputId") as string;

  // Veritabanında "inputId" ile eşleşen "todo"yu bulup, "title" alanını günceller
  await prisma.todo.update({
    where: {
      id: inputId,
    },
    data: {
      title: input,
    },
  });

  // Veriyi yenilemek veya güncellemek için Next.js'te "/"" yolunu yeniden getirir
  revalidatePath("/");
}

// Bir "todo"yu silmek için form verilerini alan fonksiyon
export async function deleteTodo(formData: FormData) {
  // Form verilerinden "inputId" adındaki değeri alıp string olarak alıyoruz
  const inputId = formData.get("inputId") as string;

  // Veritabanında "inputId" ile eşleşen "todo"yu siler
  await prisma.todo.delete({
    where: {
      id: inputId,
    },
  });

  // Veriyi yenilemek veya güncellemek için Next.js'te "/"" yolunu yeniden getirir
  revalidatePath("/");
}

// Bir "todo"nun durumunu güncellemek için form verilerini alan fonksiyon
export async function todoStatus(formData: FormData) {
  // Form verilerinden "inputId" adındaki değeri alıp string olarak alıyoruz
  const inputId = formData.get("inputId") as string;

  // "inputId" ile eşleşen "todo"yu bulur
  const todo = await prisma.todo.findUnique({
    where: {
      id: inputId,
    },
  });

  // Eğer "todo" bulunamazsa, işlemi sonlandırır ve geri döner
  if (!todo) {
    return;
  }

  // "isComplated" durumunu tersine çevirir
  const updatedStatus = !todo.isComplated;

  // "isComplated" durumunu günceller
  await prisma.todo.update({
    where: {
      id: inputId,
    },
    data: {
      isComplated: updatedStatus,
    },
  });

  // Veriyi yenilemek veya güncellemek için Next.js'te "/"" yolunu yeniden getirir
  revalidatePath("/");

  // Güncellenen "todo"nun son durumunu döner
  return updatedStatus;
}
