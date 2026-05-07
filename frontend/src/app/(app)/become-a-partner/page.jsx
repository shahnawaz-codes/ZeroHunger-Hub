"use client";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button, Input, showToast } from "@/components/ui";
import useCreateRestaurant from "@/hooks/restaurant/useCreateRestaurant";
import { restaurantSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function BecomePartnerPage() {
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm({ resolver: zodResolver(restaurantSchema) });
  const { mutate, isPending, isError, error } = useCreateRestaurant();
  const onSubmit = (values) => {
    let payload = {
      name: values.name,
      address: values.address,
      cuisine: values.cuisine,
    };
    mutate(payload, {
      onSuccess: () => {
        showToast.success("Restaurant created successfully!");
        router.push("/restaurant/dashboard");
      },
    });
  };

  return (
    <>
      <AuthCard
        title="Become a Partner"
        subtitle="Get started for free"
        footerLinkHref="/"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <Input
            label="Name"
            type="text"
            placeholder="Enter your restaurant name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Address"
            type="text"
            placeholder="Enter your restaurant address"
            error={errors.address?.message}
            {...register("address")}
          />
          <Input
            label="Cuisine"
            type="text"
            placeholder="Enter your restaurant cuisine"
            error={errors.cuisine?.message}
            {...register("cuisine")}
          />
          <Button
            isLoading={isPending || isSubmitting}
            disabled={!isValid}
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </form>
      </AuthCard>
    </>
  );
}
