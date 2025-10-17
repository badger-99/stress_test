import { Document, Image, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Result } from '@/lib/types';

const styles = StyleSheet.create({
	page: {
		padding: 48,
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
		marginBottom: 20,
		gap: 40,
	},
	metaItem: {
		fontSize: 14,
	},
	section: {
		marginBottom: 48,
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
		padding: 24,
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
		fontSize: 28,
		fontWeight: 'bold',
	},
	description: {
		fontSize: 14,
		lineHeight: 1.6,
		paddingTop: 16,
		borderTop: '1px solid #d1d5db',
	},
	recommendationItem: {
		flexDirection: 'row',
		marginBottom: 12,
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
		fontSize: 14,
		lineHeight: 1.6,
	},
	footer: {
		borderTop: '1px solid #d1d5db',
		paddingTop: 24,
	},
	disclaimer: {
		backgroundColor: '#f3f4f6',
		padding: 16,
		borderRadius: 8,
		fontSize: 10,
		lineHeight: 1.5,
	},
});

export function PDFReport({ data }: { data: Result }) {
	const date = new Date(data.time).toLocaleString();

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
								<Text style={styles.scoreValue}>{data.score} / 50</Text>
							</View>
							<View style={styles.scoreItem}>
								<Text style={styles.scoreLabel}>Stress Level</Text>
								<Text style={styles.scoreValue}>{data.feedback.stress_level}</Text>
							</View>
						</View>
						<Text style={styles.description}>{data.feedback.description}</Text>
					</View>
				</View>

				{/* Recommendations */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Recommendations</Text>
					{data.feedback.recommendations.map((rec, index) => (
						<View key={index} style={styles.recommendationItem}>
							<Text style={styles.recommendationNumber}>{index + 1}</Text>
							<Text style={styles.recommendationText}>{rec}</Text>
						</View>
					))}
				</View>

				{/* Footer */}
				<View style={styles.footer}>
					<View style={styles.disclaimer}>
						<Text>
							Disclaimer: This tool is for personal reflection and not a medical diagnosis.
						</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
}
