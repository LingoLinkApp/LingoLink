export interface LanguageLevel {
	name: string;
	description: string;
	value: string;
}

export const languageLevels = [
	{
		name: 'Beginner',
		description:
			'I can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type.',
		value: 'beginner',
	},
	{
		name: 'Elementary',
		description:
			'I can introduce myself and others and can ask and answer questions about personal details.',
		value: 'elementary',
	},
	{
		name: 'Intermediate',
		description:
			'I can understand sentences and frequently used expressions related to areas of most immediate relevance.',
		value: 'intermediate',
	},
	{
		name: 'Upper Intermediate',
		description:
			'I can understand the main ideas of complex text on both concrete and abstract topics.',
		value: 'upper_intermediate',
	},
	{
		name: 'Advanced',
		description:
			'I can understand a wide range of demanding, longer texts, and recognize implicit meaning.',
		value: 'advanced',
	},
	{
		name: 'Proficient',
		description:
			'I can understand with ease virtually everything heard or read, and can summarize information from different spoken and written sources.',
		value: 'proficient',
	},
];
