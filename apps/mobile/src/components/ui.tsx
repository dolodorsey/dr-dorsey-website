import type { PropsWithChildren } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Entity } from '@/lib/enterprise';

export const colors = {
  ink: '#080706',
  panel: '#11100E',
  panel2: '#18150F',
  gold: '#D8B764',
  gold2: '#F0D995',
  cream: '#F4EFE5',
  muted: '#AAA297',
  border: '#30281A',
};

export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Eyebrow({ children }: PropsWithChildren) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

export function PageTitle({ children }: PropsWithChildren) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Body({ children }: PropsWithChildren) {
  return <Text style={styles.body}>{children}</Text>;
}

export function EntityCard({ entity, onPress }: { entity: Entity; onPress: () => void }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={onPress}>
      <View style={styles.statusRow}>
        <View style={styles.dot} />
        <Text style={styles.status}>{entity.status_label || entity.status}</Text>
      </View>
      <View style={styles.logoBox}>
        {entity.logo_url ? (
          <Image source={{ uri: entity.logo_url }} style={styles.logo} resizeMode="contain" />
        ) : (
          <Text style={styles.wordmark}>{entity.name}</Text>
        )}
      </View>
      <Text style={styles.cardTitle}>{entity.name}</Text>
      <Text style={styles.cardMeta}>{entity.category || entity.short_description}</Text>
      <Text style={styles.action}>{entity.destinations?.[0]?.action_label || 'Explore'} →</Text>
    </Pressable>
  );
}

export function MessageCard({ title, body, action }: { title: string; body?: string | null; action?: string }) {
  return (
    <View style={styles.messageCard}>
      <Text style={styles.messageTitle}>{title}</Text>
      {!!body && <Text style={styles.messageBody}>{body}</Text>}
      {!!action && <Text style={styles.action}>{action}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.ink },
  scroll: { padding: 22, paddingBottom: 60, gap: 16 },
  eyebrow: { color: colors.gold2, fontSize: 11, letterSpacing: 2.2, textTransform: 'uppercase', fontWeight: '700' },
  title: { color: colors.cream, fontSize: 42, lineHeight: 44, fontWeight: '600', letterSpacing: -1.2 },
  body: { color: colors.muted, fontSize: 16, lineHeight: 24 },
  card: { backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.border, padding: 18, minHeight: 235 },
  cardPressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  statusRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#65D08A' },
  status: { color: colors.muted, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase' },
  logoBox: { minHeight: 110, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  logo: { width: '90%', height: 90 },
  wordmark: { color: colors.gold2, fontSize: 28, lineHeight: 30, textAlign: 'center', fontWeight: '600' },
  cardTitle: { color: colors.cream, fontSize: 24, fontWeight: '600' },
  cardMeta: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  action: { color: colors.gold2, fontSize: 12, fontWeight: '700', marginTop: 14, textTransform: 'uppercase', letterSpacing: 1 },
  messageCard: { backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.border, padding: 18 },
  messageTitle: { color: colors.cream, fontSize: 22, fontWeight: '600' },
  messageBody: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 7 },
});
