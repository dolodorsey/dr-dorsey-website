import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Body, colors, EntityCard, Eyebrow, MessageCard, PageTitle, Screen } from '@/components/ui';
import { getCurrentFocus, getPublishedContent, resolveAndOpen, type ContentItem, type Entity } from '@/lib/enterprise';

export default function HomeScreen() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const [entityRows, contentRows] = await Promise.all([getCurrentFocus(), getPublishedContent()]);
      setEntities(entityRows);
      setContent(contentRows);
    } catch (requestError) {
      console.error(requestError);
      setError('The enterprise feed could not refresh. Pull down to try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  return (
    <Screen>
      <Eyebrow>The Kollective · Enterprise Home</Eyebrow>
      <PageTitle>One account. The whole enterprise.</PageTitle>
      <Body>Your direct path to brands, events, products, opportunities, services and standalone apps.</Body>

      <View style={styles.hero}>
        <Text style={styles.heroLabel}>YOUR NEXT MOVE</Text>
        <Text style={styles.heroTitle}>Enter what matters now.</Text>
        <View style={styles.heroActions}>
          <ActionButton label="Rose This Week" onPress={() => resolveAndOpen('rose-on-piedmont', 'mobile_home')} />
          <ActionButton label="Buy Hakuna Matata" onPress={() => resolveAndOpen('hakuna-matata', 'mobile_home')} />
          <ActionButton label="Black Pages" onPress={() => resolveAndOpen('black-pages', 'mobile_home')} />
        </View>
      </View>

      {content.map((item) => <MessageCard key={item.id} title={item.title} body={item.summary} action="Open update →" />)}

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Current Focus</Text><Text style={styles.sectionMeta}>{entities.length} entities</Text></View>
      {loading ? <ActivityIndicator color={colors.gold2} size="large" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {entities.slice(0, 8).map((entity) => <EntityCard key={entity.id} entity={entity} onPress={() => resolveAndOpen(entity.slug, 'mobile_home_focus')} />)}

      <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); void load(); }} tintColor={colors.gold2} />
    </Screen>
  );
}

function ActionButton({ label, onPress }: { label: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.7 }]}><Text style={styles.actionText}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.panel2, borderWidth: 1, borderColor: colors.gold, padding: 20, gap: 12 },
  heroLabel: { color: colors.gold2, fontSize: 10, letterSpacing: 2, fontWeight: '800' },
  heroTitle: { color: colors.cream, fontSize: 30, fontWeight: '600' },
  heroActions: { gap: 8 },
  actionButton: { backgroundColor: colors.gold, paddingVertical: 14, paddingHorizontal: 16 },
  actionText: { color: colors.ink, fontWeight: '800', letterSpacing: 0.5 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  sectionTitle: { color: colors.cream, fontSize: 28, fontWeight: '600' },
  sectionMeta: { color: colors.muted, fontSize: 12 },
  error: { color: '#FF9A9A', lineHeight: 20 },
});
