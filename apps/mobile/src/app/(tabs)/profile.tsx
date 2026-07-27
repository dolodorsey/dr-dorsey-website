import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { Session } from '@supabase/supabase-js';
import { Body, colors, Eyebrow, PageTitle, Screen } from '@/components/ui';
import { getSession, registerPushToken, signInWithEmail, signOut, supabase } from '@/lib/enterprise';

export default function ProfileScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [homeCity, setHomeCity] = useState('Atlanta');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSession().then(setSession);
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user.id) return;
    supabase
      .from('kollective_app_profiles')
      .select('full_name,home_city')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.full_name) setName(data.full_name);
        if (data?.home_city) setHomeCity(data.home_city);
      });
  }, [session?.user.id]);

  async function requestLogin() {
    if (!email.includes('@')) return Alert.alert('Enter a valid email address.');
    const { error } = await signInWithEmail(email);
    if (error) return Alert.alert('Sign-in failed', error.message);
    Alert.alert('Check your email', 'Your secure Kollective sign-in link is on the way.');
  }

  async function saveProfile() {
    if (!session?.user.id) return;
    setSaving(true);
    const { error } = await supabase.from('kollective_app_profiles').upsert({
      user_id: session.user.id,
      full_name: name.trim(),
      display_name: name.trim(),
      home_city: homeCity.trim(),
      membership_level: 'registered_user',
    });
    setSaving(false);
    if (error) return Alert.alert('Profile not saved', error.message);
    Alert.alert('Profile saved', 'Your city and identity will drive personalization.');
  }

  async function enableNotifications() {
    if (!session?.user.id) return;
    try {
      const token = await registerPushToken(session.user.id);
      Alert.alert(token ? 'Notifications enabled' : 'Device setup required', token ? 'This device is registered.' : 'Use a physical development build with an EAS project ID.');
    } catch (error) {
      Alert.alert('Notification setup failed', error instanceof Error ? error.message : 'Try again.');
    }
  }

  if (!session) {
    return (
      <Screen>
        <Eyebrow>Universal Identity</Eyebrow>
        <PageTitle>One account across the enterprise.</PageTitle>
        <Body>Sign in to save interests, receive relevant updates, track applications and unlock membership access.</Body>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor="#756F66" keyboardType="email-address" autoCapitalize="none" style={styles.input} />
        <Button label="Send Secure Sign-In Link" onPress={requestLogin} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Eyebrow>Member Profile</Eyebrow>
      <PageTitle>Control your enterprise relationship.</PageTitle>
      <Body>Signed in as {session.user.email}. Your profile remains private and drives your city, interests and access.</Body>
      <View style={styles.form}>
        <Label text="Full name" />
        <TextInput value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor="#756F66" style={styles.input} />
        <Label text="Home city" />
        <TextInput value={homeCity} onChangeText={setHomeCity} placeholder="Atlanta" placeholderTextColor="#756F66" style={styles.input} />
      </View>
      <Button label={saving ? 'Saving...' : 'Save Profile'} onPress={saveProfile} disabled={saving} />
      <Button label="Enable Enterprise Notifications" onPress={enableNotifications} secondary />
      <Button label="Sign Out" onPress={() => signOut()} secondary />
    </Screen>
  );
}

function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

function Button({ label, onPress, secondary = false, disabled = false }: { label: string; onPress: () => void; secondary?: boolean; disabled?: boolean }) {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, secondary && styles.buttonSecondary, pressed && { opacity: 0.72 }, disabled && { opacity: 0.5 }]}>
      <Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  form: { gap: 8, marginTop: 8 },
  label: { color: colors.gold2, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  input: { backgroundColor: colors.panel, color: colors.cream, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, paddingVertical: 15, fontSize: 16 },
  button: { backgroundColor: colors.gold, paddingVertical: 16, paddingHorizontal: 18, alignItems: 'center' },
  buttonSecondary: { backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.gold },
  buttonText: { color: colors.ink, fontWeight: '800', letterSpacing: 0.6, textTransform: 'uppercase' },
  buttonTextSecondary: { color: colors.gold2 },
});
