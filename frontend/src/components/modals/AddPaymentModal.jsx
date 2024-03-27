"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import useAddPaymentModal from "@/hooks/useAddPaymentModal";
import Modal from "./Modal";
import Heading from "./Heading";

const AddPaymentModal = () => {
  const router = useRouter();
  const addPaymentModal = useAddPaymentModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm <
  FieldValues >
  {
    defaultValues: {
      email: "",
      password: "",
    },
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // signIn("credentials", {
    //   ...data,
    //   redirect: false,
    // }).then((callback) => {
    //   setIsLoading(false);

    //   if (callback?.ok) {
    //     toast.success("Logged in");
    //     router.refresh();
    //     loginModal.onClose();
    //   }

    //   if (callback?.error) {
    //     toast.error(callback.error);
    //   }
    // });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <span
          className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
        >
          {" "}
          Create an account
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={addPaymentModal.isOpen}
      title="Add payment"
      actionLabel="Continue"
      onClose={addPaymentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default AddPaymentModal;
