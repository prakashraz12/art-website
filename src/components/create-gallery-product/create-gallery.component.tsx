"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

const mediumOptions = [
  "Oil",
  "Acrylic",
  "Watercolor",
  "Gouache",
  "Pastel",
  "Charcoal",
  "Pencil",
  "Ink",
  "Mixed Media",
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  inFramePerson: z.string().min(1, "Person in frame is required"),
  dateAccomplished: z.date({
    required_error: "Date accomplished is required",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  mediums: z.array(z.string()).min(1, "At least one medium is required"),
  clientName: z.string().min(1, "Client name is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateProduct() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mediums: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log({ ...data, profileImage, productImages });
    // Here you would typically send this data to your backend
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const readerPromises = filesArray.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises).then((results) => {
        setProductImages((prev) => [...prev, ...results]);
      });
    }
  };

  const removeProductImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="inFramePerson">Person in Frame</Label>
          <Input id="inFramePerson" {...register("inFramePerson")} />
          {errors.inFramePerson && (
            <p className="text-red-500 text-sm mt-1">
              {errors.inFramePerson.message}
            </p>
          )}
        </div>

        <div>
          <Label>Date Accomplished</Label>
          <Controller
            control={control}
            name="dateAccomplished"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${
                      !field.value && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  {/* <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  /> */}
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.dateAccomplished && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateAccomplished.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <Label>Mediums</Label>
          <Controller
            control={control}
            name="mediums"
            render={({ field }) => (
              <Select
                onValueChange={(value) =>
                  field.onChange([...field.value, value])
                }
                value={field.value[field.value.length - 1]}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mediums" />
                </SelectTrigger>
                <SelectContent>
                  {mediumOptions.map((medium) => (
                    <SelectItem key={medium} value={medium}>
                      {medium}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.mediums && (
            <p className="text-red-500 text-sm mt-1">
              {errors.mediums.message}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {control._formValues.mediums.map(
              (medium: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                >
                  {medium}
                  <button
                    type="button"
                    onClick={() => {
                      const newMediums = control._formValues.mediums.filter(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (_:any, i:number) => i !== index
                      );
                      control._formValues.mediums = newMediums;
                    }}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </span>
              )
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="clientName">Client Name</Label>
          <Input id="clientName" {...register("clientName")} />
          {errors.clientName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.clientName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="profileImage">Profile Image</Label>
          <Input
            id="profileImage"
            type="file"
            onChange={handleProfileImageUpload}
            className="mb-2"
          />
          {profileImage && (
            <div className="relative w-32 h-32">
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="object-cover rounded"
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="productImages">Product Images</Label>
          <Input
            id="productImages"
            type="file"
            multiple
            onChange={handleProductImageUpload}
            className="mb-2"
          />
          <div className="grid grid-cols-3 gap-4 mt-2">
            {productImages.map((img, index) => (
              <div key={index} className="relative w-full pt-[100%]">
                <Image
                  src={img}
                  alt={`Product ${index + 1}`}
                  fill
                  className="object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeProductImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Create Product
        </Button>
      </form>
    </div>
  );
}
