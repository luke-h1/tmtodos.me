import { CustomHead } from '@src/components/CustomHead';
import { Form, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import { Flex } from '@src/components/Flex';
import { InputField } from '@src/components/InputField';
import { useLoginMutation } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { toErrorMap } from '@src/utils/toErrorMap';

interface FormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC<{}> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <>
      <CustomHead title="Login | tmtodos.me" description="Login" />
      <NextSeo
        title="Login"
        canonical="https://tmtodos.me/login"
        openGraph={{
          url: 'https://tmtodos.me/login',
          title: 'Login',
        }}
      />
      <Flex>
        <Formik<FormValues>
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const res = await login(values);
            if (res.data?.login.errors) {
              setErrors(toErrorMap(res.data.login.errors));
            }
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              setTimeout(() => {
                router.push('/');
              }, 2000);
            }
          }}
        >
          {({ isSubmitting }) => (
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
              <div className="mt-5 mb-5">
                <Link href="/forgot-password">
                  <a className="text-center text-black">Forgot Password ?</a>
                </Link>
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5"
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </Flex>
    </>
  );
};
export default withUrqlClient(createUrqlClient)(LoginPage);
