import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, colors, EntityCard, Eyebrow, PageTitle, Screen } from '@/components/ui';
import { getAllEntities, resolveAndOpen, type Entity } from '@/lib/enterprise';

export default function ExploreScreen() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [query, setQuery] = useState('');
  const [division, setDivision] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEntities()
      .then(setEntities)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const divisions = useMemo(
    () => ['all', ...Array.from(new Set(entities.map((entity) => entity.division_slug).filter(Boolean))) as string[]],
    [entities],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return entities.filter((entity) => {
      const divisionMatch = division === 'all' || entity.division_slug === division;
      const textMatch = !normalized || `${entity.name} ${entity.category || ''} ${entity.short_description || ''}`.toLowerCase().includes(normalized);
      return divisionMatch && textMatch;
    });
  }, [division, entities, query]);

  return (
    <Screen>
      <Eyebrow>Explore The Enterprise</Eyebrow>
      <PageTitle>Find the right brand, action or opportunity.</PageTitle>
      <Body>Search the full public enterprise. Every result carries a defined next action.</Body>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search brands, products, apps, services..."
        placeholderTextColor="#756F66"
        style={styles.search}
        autoCapitalize="none"
      />
      <View style={styles.filters}>
        {divisions.map((item) => (
          <Pressable key={item} onPress={() => setDivision(item)} style={[styles.filter, division === item && styles.filterActive]}>
            <Text style={[styles.filterText, division === item && styles.filterTextActive]}>{item.replaceAll('-', ' ')}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.resultCount}>{filtered.length} RESULTS</Text>
      {loading ? <ActivityIndicator color={colors.gold2} size="large" /> : null}
      {filtered.map((entity) => <EntityCard key={entity.id} entity={entity} onPress={() => resolveAndOpen(entity.slug, 'mobile_explore')} />)}
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: { backgroundColor: colors.panel, color: colors.cream, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, paddingVertical: 15, fontSize: 16 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filter: { borderWidth: 1, borderColor: colors.border, paddingHorizontal: 11, paddingVertical: 8 },
  filterActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  filterText: { color: colors.muted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.7 },
  filterTextActive: { color: colors.ink, fontWeight: '800' },
  resultCount: { color: colors.gold2, fontSize: 10, letterSpacing: 1.5, marginTop: 4 },
});
