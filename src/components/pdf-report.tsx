import { MAX_SCORE } from '@/lib/data/assessment';
import { Document, Image, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Result } from '@/lib/types';

const styles = StyleSheet.create({
	page: {
		padding: 40,
		backgroundColor: '#ffffff',
	},
	logo: {
		width: 50,
		height: 50,
	},
	header: {
		marginBottom: 32,
		borderBottom: '2px solid #d1d5db',
		paddingBottom: 24,
	},
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4, 
		marginBottom: 10,
	},
	headerText: {
		flexDirection: 'column',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 12,
		color: '#4b5563',
	},
	metaRow: {
		flexDirection: 'row',
		marginBottom: 12,
		gap: 40,
	},
	metaItem: {
		fontSize: 14,
	},
	section: {
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 12,
	},
	resultBox: {
		backgroundColor: '#f9fafb',
		border: '1px solid #e5e7eb',
		borderRadius: 8,
		padding: 18,
	},
	scoreRow: {
		flexDirection: 'row',
		gap: 48,
		marginBottom: 16,
	},
	scoreItem: {
		flex: 1,
	},
	scoreLabel: {
		fontSize: 10,
		color: '#6b7280',
		textTransform: 'uppercase',
		marginBottom: 4,
	},
	scoreValue: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	description: {
		fontSize: 12,
		lineHeight: 1.5,
		paddingTop: 12,
		borderTop: '1px solid #d1d5db',
	},
	recommendationItem: {
		flexDirection: 'row',
		marginBottom: 8,
		gap: 12,
	},
	recommendationNumber: {
		width: 20,
		height: 20,
		backgroundColor: '#3b82f6',
		color: '#ffffff',
		borderRadius: 10,
		fontSize: 10,
		textAlign: 'center',
		paddingTop: 4,
	},
	recommendationText: {
		flex: 1,
		fontSize: 12,
		lineHeight: 1.5,
	},
	labelRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 6,
	},
	aiBadge: {
		fontSize: 8,
		color: '#1d4ed8',
		backgroundColor: '#eff6ff',
		border: '1px solid #bfdbfe',
		borderRadius: 8,
		paddingVertical: 2,
		paddingHorizontal: 6,
	},
	aiSummary: {
		marginTop: 12,
		paddingTop: 12,
		borderTop: '1px solid #d1d5db',
	},
	aiSummaryText: {
		fontSize: 12,
		lineHeight: 1.5,
	},
	sectionTitleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 12,
	},
	footer: {},
	disclaimer: {
		backgroundColor: '#f3f4f6',
		padding: 10,
		borderRadius: 8,
		fontSize: 9,
		lineHeight: 1.4,
	},
});

export function PDFReport({ data }: { data: Result }) {
	const date = new Date(data.created_at).toLocaleString();
	// AI recommendations replace the static ones when the summary call succeeded.
	const recommendations = data.ai?.recommendations ?? data.feedback.recommendations;

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				{/* Header */}
				<View style={styles.headerRow}>
					<Image style={styles.logo} src='/st_logo-3.png' />
					<View style={styles.headerText}>
						<Text style={styles.title}>Stress Test</Text>
						<Text style={styles.subtitle}>Emotional Well-Being Check-In</Text>
					</View>
				</View>

				<View style={styles.metaRow}>
					<Text style={styles.metaItem}>Date: {date}</Text>
					<Text style={styles.metaItem}>Name: {data.name}</Text>
				</View>

				{/* Results */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Results</Text>
					<View style={styles.resultBox}>
						<View style={styles.scoreRow}>
							<View style={styles.scoreItem}>
								<Text style={styles.scoreLabel}>Overall Score</Text>
								<Text style={styles.scoreValue}>{data.score} / {MAX_SCORE}</Text>
							</View>
							<View style={styles.scoreItem}>
								<Text style={styles.scoreLabel}>Stress Level</Text>
								<Text style={styles.scoreValue}>{data.feedback.stress_level}</Text>
							</View>
						</View>
						<Text style={styles.description}>{data.feedback.description}</Text>
						{data.ai && (
							<View style={styles.aiSummary}>
								<View style={styles.labelRow}>
									<Text style={styles.scoreLabel}>Your Personal Summary</Text>
									<Text style={styles.aiBadge}>AI-generated</Text>
								</View>
								<Text style={styles.aiSummaryText}>{data.ai.summary}</Text>
							</View>
						)}
					</View>
				</View>

				{/* Recommendations */}
				<View style={styles.section}>
					<View style={styles.sectionTitleRow} minPresenceAhead={60}>
						<Text style={{ ...styles.sectionTitle, marginBottom: 0 }}>Recommendations</Text>
						{data.ai && <Text style={styles.aiBadge}>AI-generated</Text>}
					</View>
					{recommendations.map((rec, index) => (
						<View key={index} style={styles.recommendationItem} wrap={false}>
							<Text style={styles.recommendationNumber}>{index + 1}</Text>
							<Text style={styles.recommendationText}>{rec}</Text>
						</View>
					))}
				</View>

				{/* Footer */}
				<View style={styles.footer} wrap={false}>
					<View style={styles.disclaimer}>
						<Text>
							Disclaimer: This tool is for personal reflection and not a medical diagnosis.
							Questions from the Perceived Stress Scale (PSS-10; Cohen, Kamarck & Mermelstein, 1983).
							Stress levels use commonly applied score ranges and are a guide, not a clinical cutoff.
							{data.ai &&
								' Sections marked AI-generated were written by a language model from your answers only (no name or other personal details were sent) and may not be perfect.'}
						</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
}
