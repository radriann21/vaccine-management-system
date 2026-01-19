import {
  Box,
  Field,
  Fieldset,
  Flex,
  Heading,
  Icon,
  Input,
  Button,
} from "@chakra-ui/react";
import { PasswordInput } from "@/shared/components/ui/password-input";
import { Antenna } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "../validations/login.validation";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  const { login, isLoading } = useLogin();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    login(data);
  };

  return (
    <Box
      as="article"
      bgColor="white"
      p={4}
      borderRadius="md"
      shadow="sm"
      w="450px"
    >
      <Flex justifyContent="center" direction="column" alignItems="center">
        <Icon p={2} bgColor="#135DFB" color="white" rounded="sm" mx="auto">
          <Antenna size={36} />
        </Icon>
        <Heading size="md" mt="10px">
          Sistema de Gestión de Vacunas
        </Heading>
      </Flex>
      <Fieldset.Root maxW="full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Content>
            <Field.Root required invalid={!!errors.email}>
              <Field.Label>
                Email
                <Field.RequiredIndicator />
              </Field.Label>
              <Input 
                type="email" 
                placeholder="Ingresa el email..." 
                {...register("email")}
              />
              {errors.email && (
                <Field.ErrorText>{errors.email.message}</Field.ErrorText>
              )}
            </Field.Root>
            <Field.Root required invalid={!!errors.password}>
              <Field.Label>
                Contraseña
                <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput 
                placeholder="Ingresa la contraseña..." 
                {...register("password")}
              />
              {errors.password && (
                <Field.ErrorText>{errors.password.message}</Field.ErrorText>
              )}
            </Field.Root>
            <Button 
              bgColor="#185DFB"
              type="submit" 
              rounded="md" 
              loading={isLoading}
              w="full"
            >
              Iniciar sesión
            </Button>
          </Fieldset.Content>
        </form>
      </Fieldset.Root>
    </Box>
  )
};
