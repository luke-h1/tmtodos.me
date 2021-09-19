import { CustomHead } from '@src/components/CustomHead';
import { Form, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { Flex } from '@src/components/Flex';
import { InputField } from '@src/components/InputField';
import { useRegisterMutation } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { toErrorMap } from '@src/utils/toErrorMap';

interface FormValues {
  email: string;
  password: string;
  image: string;
}

const RegisterPage: React.FC<{}> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <>
      <CustomHead title="Register | tmtodos.me" description="Register" />
      <NextSeo
        title="Register"
        canonical="https://tmtodos.me/register"
        openGraph={{
          url: 'https://tmtodos.me/register',
          title: 'Register',
        }}
      />
      <Flex>
        <Formik<FormValues>
          initialValues={{ email: '', password: '', image: '' }}
          onSubmit={async (values, { setErrors }) => {
            const res = await register({
              options: {
                email: values.email,
                password: values.password,
              },
              image: values.image,
            });
            if (res.data?.register.errors) {
              setErrors(toErrorMap(res.data.register.errors));
            } else {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="email"
                data-testid="email"
              />
              <div className="mt-5 mb-5">
                <InputField
                  name="password"
                  placeholder="password"
                  label="password"
                  type="password"
                  data-testid="password"
                />
              </div>
              <div className="mt-4 mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={({ target: { validity, files } }) => {
                    if (validity.valid && files) {
                      setFieldValue('image', files[0]);
                      // set 'file' of the form data as files[0]
                    }
                  }}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up ! 🚀
              </button>
            </Form>
          )}
        </Formik>
      </Flex>
    </>
  );
};
export default withUrqlClient(createUrqlClient)(RegisterPage);
