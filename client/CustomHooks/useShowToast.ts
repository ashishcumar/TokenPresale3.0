import { ToastPosition, useToast } from "@chakra-ui/react";

const useShowToast = () => {
  const toast = useToast();

  const showToast = ({
    title,
    description,
    status,
    duration,
    isClosable,
    position,
  }: {
    title: string;
    description: string;
    status: "info" | "warning" | "success" | "error" | "loading" | undefined;
    duration: number;
    isClosable: boolean;
    position: ToastPosition | undefined;
  }) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: duration || 3000,
      isClosable: isClosable || true,
      position: position || "top-right",
    });
  };

  const closeAllToasts = () => {
    toast.closeAll();
  };


  return { showToast, closeAllToasts };
};

export default useShowToast;
