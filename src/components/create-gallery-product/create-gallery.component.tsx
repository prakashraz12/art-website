"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import {  LoaderCircle, X } from "lucide-react";
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


import { toast } from "@/hooks/use-toast";
import { addDoc, collection } from "firebase/firestore";
import { db, slugGenerator } from "@/lib/utils";
import { useRouter } from "next/navigation";

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
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  mediums: z.array(z.string()).min(1, "At least one medium is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profileImageLoading, setProfileImageLoading] = useState(false);
  const [imageUplaoding, setImageUploading] = useState(false);
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

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await addDoc(collection(db, "arts-gallery"), {
        title: data?.title,
        description: data?.description,
        profileImage: profileImage,
        mediums: data?.mediums,
        price: data?.price,
        slug: slugGenerator(data?.title),
        createdAt: new Date(),
        images:productImages
      });
      router.push("/");
      toast({
        title: "Success",
        description: "Gallery created successfully!",
      });
      setProductImages([]);
      setProfileImage("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && /^image\//.test(file.type)) {
      setProfileImageLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "prakash-media");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/du1bbws62/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Image upload failed");
        }

        const data = await res.json();
        setProfileImage(data.secure_url);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setProfileImageLoading(false);
      }
    }
  };

  const handleProductImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageUploading(true);

      try {
        const readerPromises = filesArray.map(async (file) => {
          if (file && /^image\//.test(file.type)) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "prakash-media");

            const res = await fetch(
              "https://api.cloudinary.com/v1_1/du1bbws62/image/upload",
              {
                method: "POST",
                body: formData,
              }
            );

            if (!res.ok) {
              throw new Error("Image upload failed");
            }

            const data = await res.json();
            return data.secure_url;
          }
        });

        const uploadedImages = await Promise.all(readerPromises);
        setProductImages((prevImages) => [
          ...prevImages,
          ...uploadedImages.filter(Boolean),
        ]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setImageUploading(false);
      }
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
                        (_: any, i: number) => i !== index
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
          <Label htmlFor="profileImage">Profile Image</Label>
          <Input
            id="profileImage"
            type="file"
            onChange={handleProfileImageUpload}
            className="mb-2"
          />
          {profileImageLoading && (
            <div className="flex justify-center">
              <LoaderCircle className="animate-spin" />{" "}
            </div>
          )}
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
            {imageUplaoding && (
              <div className="flex justify-center">
                <LoaderCircle className="animate-spin" />{" "}
              </div>
            )}
            {productImages?.map((img, index) => (
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
