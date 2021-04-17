import { CustomHead } from 'components/CustomHead';
import { Form, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { Flex } from '../components/Flex';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

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
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const res = await register({ options: values });
            if (res.data?.register.errors) {
              setErrors(toErrorMap(res.data.register.errors));
            }
            router.push('/');
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" placeholder="email" label="email" />
              <div className="mt-5 mb-5">
                <InputField
                  name="password"
                  placeholder="password"
                  label="password"
                  type="password"
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
