import { CustomHead } from 'components/CustomHead';
import { Form, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import { Flex } from '../components/Flex';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

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
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const res = await login(values);
            if (res.data?.login.errors) {
              setErrors(toErrorMap(res.data.login.errors));
            }
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" placeholder="email" label="email" data-testid="email" />
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
