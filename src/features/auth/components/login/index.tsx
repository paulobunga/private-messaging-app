/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import {
    Text,
    Input,
    Layout,
    Button,
} from '@ui-kitten/components';
import { connect } from 'react-redux';

/**
 * Internal dependencies.
 */
import styles from './styles';
import HttpClient from '@/client';
import { logIn, setAuthToken, loadUserData } from '@/store/authentication/actions';

interface LoginProps {
    navigation: any,
    logIn: Function,
    setAuthToken: Function,
    loadUserData: () => Promise<void>
}

const Login = ({ navigation, setAuthToken, logIn, loadUserData }: LoginProps): React.ReactFragment => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [hasErrors, setHasErrors] = useState(false);

    const onButtonPress = async () => {
        setSubmitted(true);
        setHasErrors(false);

        if (!email || !password || loading) {
            return;
        }

        setLoading(true);

        const client = new HttpClient();

        try {
            const response = await client.login(email, password);

            setAuthToken(response.data.access_token);
            logIn();

            await loadUserData();

            navigation.navigate('PagesRouter');
        } catch (error) {
            setHasErrors(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout style={styles.container}>
            <Layout style={styles.formContainer}>
                <KeyboardAvoidingView
                    behavior={(Platform.OS === 'ios') ? 'padding' : null}
                    keyboardVerticalOffset={Platform.select({ ios: 80, android: 200 })}
                >
                    <Text category="h1" style={styles.heading}>Log In</Text>

                    {hasErrors && <Text style={styles.errorText} status="danger">We couldn't find you in our database.</Text>}

                    <Layout style={styles.formBody}>
                        <Input
                            placeholder="Enter email"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            autoCapitalize="none"
                            status={submitted && !email ? 'danger' : ''}
                            caption={submitted && !email ? 'Email is required' : ''}
                            style={styles.formInput}
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Input
                            placeholder="Enter password"
                            autoCompleteType="password"
                            textContentType="password"
                            autoCapitalize="none"
                            status={submitted && !password ? 'danger' : ''}
                            caption={submitted && !password ? 'Password is required' : ''}
                            secureTextEntry={true}
                            style={styles.lastFormInput}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <Button onPress={onButtonPress}
                            style={styles.button}
                            size="medium"
                            icon={() => loading ? <ActivityIndicator color="#fff" /> : <React.Fragment />}>
                            Login
                        </Button>

                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.linkText}>Don't have an account?</Text>
                        </TouchableOpacity>
                    </Layout>
                </KeyboardAvoidingView>
            </Layout>
        </Layout>
    );
};

const mapDispatchToProps = ({
    logIn,
    setAuthToken,
    loadUserData,
});

export default connect(null, mapDispatchToProps)(Login);
