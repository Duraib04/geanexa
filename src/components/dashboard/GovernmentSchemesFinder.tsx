import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  FileText,
  Phone,
  Trophy,
} from 'lucide-react';

interface Benefit {
  title: string;
  amount: string;
}

interface ApplicationStep {
  step: number;
  description: string;
  documents?: string[];
}

interface ApplyOffline {
  department: string;
  address: string;
  contact: string;
}

interface GovernmentScheme {
  id: string;
  name: string;
  ministry: string;
  state: string[];
  category: 'subsidy' | 'loan' | 'insurance' | 'infrastructure' | 'training' | 'marketing';
  description: string;
  eligibility: {
    landHolding: string;
    annualIncome?: string;
    age?: string;
    others?: string[];
  };
  benefits: Benefit[];
  applicationProcess: ApplicationStep[];
  requiredDocuments: string[];
  website: string;
  helpline: string;
  applyOnline: string;
  applyOffline: ApplyOffline;
  lastUpdated: string;
}

export const GovernmentSchemesFinder: React.FC = () => {
  const { t } = useLanguage();
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const states = ['Tamil Nadu', 'Andhra Pradesh', 'National'];
  const categories = [
    { id: 'all', label: 'All Schemes' },
    { id: 'subsidy', label: 'Subsidy' },
    { id: 'loan', label: 'Loan' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ];

  const getSampleSchemes = (): GovernmentScheme[] => {
    const sampleSchemes: GovernmentScheme[] = [
      {
        id: 'pm-kisan',
        name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
        ministry: 'Ministry of Agriculture',
        state: ['National'],
        category: 'subsidy',
        description: 'Direct income support of ₹6,000 per year to all farmer families',
        eligibility: {
          landHolding: 'All farmers with cultivable land',
          annualIncome: 'No income limit',
          others: ['Must be citizen of India', 'Land records should be updated']
        },
        benefits: [
          { title: 'Annual Benefit', amount: '₹6,000 per year' },
          { title: 'Payment Mode', amount: 'Direct Bank Transfer in 3 installments' }
        ],
        applicationProcess: [
          { step: 1, description: 'Visit PM-KISAN portal or nearest CSC' },
          { step: 2, description: 'Fill registration form with Aadhar and bank details' },
          { step: 3, description: 'Submit land ownership documents' },
          { step: 4, description: 'Receive confirmation SMS' }
        ],
        requiredDocuments: ['Aadhar Card', 'Bank Account', 'Land Ownership Records'],
        website: 'https://pmkisan.gov.in',
        helpline: '155261 / 1800-115-526',
        applyOnline: 'https://pmkisan.gov.in/RegistrationForm.aspx',
        applyOffline: {
          department: 'Agriculture Department',
          address: 'District Agriculture Office',
          contact: 'Contact local agriculture officer'
        },
        lastUpdated: '2026-01-01'
      },
      {
        id: 'pm-fasal-bima',
        name: 'PM Fasal Bima Yojana (PMFBY)',
        ministry: 'Ministry of Agriculture',
        state: ['National'],
        category: 'insurance',
        description: 'Crop insurance scheme providing financial support against crop loss',
        eligibility: {
          landHolding: 'All farmers - landowners and tenant farmers',
          others: ['Must have insurable interest in the crop', 'Enroll before cut-off date']
        },
        benefits: [
          { title: 'Coverage', amount: 'Up to ₹2 lakh per hectare' },
          { title: 'Premium', amount: 'Only 2% for Kharif, 1.5% for Rabi crops' }
        ],
        applicationProcess: [
          { step: 1, description: 'Register within 7 days of sowing' },
          { step: 2, description: 'Fill crop insurance form at bank or CSC' },
          { step: 3, description: 'Pay nominal premium amount' },
          { step: 4, description: 'Get insurance certificate' }
        ],
        requiredDocuments: ['Aadhar Card', 'Bank Details', 'Land Records', 'Sowing Certificate'],
        website: 'https://pmfby.gov.in',
        helpline: '1800-180-1551',
        applyOnline: 'https://pmfby.gov.in',
        applyOffline: {
          department: 'Nearest Bank or CSC',
          address: 'Any empanelled bank',
          contact: 'Visit local bank branch'
        },
        lastUpdated: '2026-01-01'
      },
      {
        id: 'rythu-bharosa',
        name: 'Rythu Bharosa (Tamil Nadu)',
        ministry: 'Tamil Nadu Agriculture Department',
        state: ['Tamil Nadu'],
        category: 'subsidy',
        description: 'Financial assistance of ₹10,000 per year to farmers',
        eligibility: {
          landHolding: 'Small and marginal farmers with land in Tamil Nadu',
          others: ['Must be registered farmer in Tamil Nadu']
        },
        benefits: [
          { title: 'Annual Benefit', amount: '₹10,000 per year' },
          { title: 'Payment', amount: 'Two installments of ₹5,000 each' }
        ],
        applicationProcess: [
          { step: 1, description: 'Visit TN Agriculture portal' },
          { step: 2, description: 'Register with Aadhar and land details' },
          { step: 3, description: 'Submit at Village Administrative Office' },
          { step: 4, description: 'Receive DBT to bank account' }
        ],
        requiredDocuments: ['Aadhar Card', 'Land Patta', 'Bank Passbook'],
        website: 'https://tn.gov.in/agriculture',
        helpline: '044-28524765',
        applyOnline: 'https://tnagrisnet.tn.gov.in',
        applyOffline: {
          department: 'Village Administrative Office',
          address: 'Contact VAO in your village',
          contact: 'Visit nearest Taluk Office'
        },
        lastUpdated: '2026-01-15'
      }
    ];

    // Filter by state
    let filteredSchemes = sampleSchemes.filter(scheme => 
      scheme.state.includes('National') || scheme.state.includes(selectedState)
    );

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredSchemes = filteredSchemes.filter(scheme => scheme.category === selectedCategory);
    }

    return filteredSchemes;
  };

  useEffect(() => {
    fetchSchemes();
  }, [selectedState, selectedCategory]);

  const fetchSchemes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: functionError } = await supabase.functions.invoke('government-schemes', {
        body: {
          state: selectedState,
          category: selectedCategory,
          language: 'en',
        },
      });

      if (functionError) throw functionError;
      setSchemes(data.allSchemes || []);
    } catch (err) {
      // Fallback to sample data when edge function is not available
      console.log('Using sample schemes data - Supabase edge function not available');
      const sampleSchemes = getSampleSchemes();
      setSchemes(sampleSchemes);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      subsidy: 'bg-green-100 text-green-800',
      loan: 'bg-blue-100 text-blue-800',
      insurance: 'bg-orange-100 text-orange-800',
      infrastructure: 'bg-purple-100 text-purple-800',
      training: 'bg-yellow-100 text-yellow-800',
      marketing: 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const SchemeCard: React.FC<{ scheme: GovernmentScheme }> = ({ scheme }) => {
    const isExpanded = expandedScheme === scheme.id;

    return (
      <Card className="mb-4 overflow-hidden transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-3 cursor-pointer" onClick={() => setExpandedScheme(isExpanded ? null : scheme.id)}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg">{scheme.name}</CardTitle>
                <Badge className={getCategoryColor(scheme.category)}>
                  {scheme.category}
                </Badge>
              </div>
              <CardDescription className="text-sm">{scheme.description}</CardDescription>
            </div>
            <button className="text-gray-400 hover:text-gray-600 ml-4">
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="space-y-6 border-t">
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Eligibility
              </h4>
              <div className="bg-gray-50 p-3 rounded-md space-y-1 text-sm">
                <p>
                  <span className="font-medium">Land Holding:</span> {scheme.eligibility.landHolding}
                </p>
                {scheme.eligibility.annualIncome && (
                  <p>
                    <span className="font-medium">Annual Income:</span> {scheme.eligibility.annualIncome}
                  </p>
                )}
                {scheme.eligibility.others && scheme.eligibility.others.length > 0 && (
                  <div>
                    <p className="font-medium">Others:</p>
                    <ul className="list-disc list-inside">
                      {scheme.eligibility.others.map((other, idx) => (
                        <li key={idx}>{other}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Benefits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {scheme.benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-green-50 p-3 rounded-md">
                    <p className="text-xs text-gray-600">{benefit.title}</p>
                    <p className="font-semibold text-green-700">{benefit.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">How to Apply</h4>
              <div className="space-y-2">
                {scheme.applicationProcess.map((step) => (
                  <div key={step.step} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{step.description}</p>
                      {step.documents && step.documents.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          📄 Documents: {step.documents.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Required Documents
              </h4>
              <div className="flex flex-wrap gap-2">
                {scheme.requiredDocuments.map((doc, idx) => (
                  <Badge key={idx} variant="outline">
                    {doc}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Helpline
                </h5>
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="font-semibold text-blue-700">{scheme.helpline}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button
                variant="default"
                size="sm"
                className="flex items-center gap-2 flex-1"
                onClick={() => window.open(scheme.applyOnline, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                Apply Online
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  const details = `${scheme.name}\n\nHelpline: ${scheme.helpline}\nWebsite: ${scheme.website}`;
                  navigator.clipboard.writeText(details);
                  alert('Scheme details copied!');
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Government Agricultural Schemes</CardTitle>
          <CardDescription className="text-base">
            Discover and apply for government schemes available for farmers
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filter Schemes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Select State</label>
            <div className="grid grid-cols-3 gap-2">
              {states.map((state) => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`p-2 rounded-md text-sm font-medium transition-all ${
                    selectedState === state
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Filter by Category</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-2 rounded-md text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full"></div>
          </div>
          <p className="mt-2 text-gray-600">Loading schemes...</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Found {schemes.length} Scheme{schemes.length !== 1 ? 's' : ''} in {selectedState}
            </h3>
          </div>

          {schemes.length > 0 ? (
            <div>
              {schemes.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          ) : (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="pt-6">
                <p className="text-center text-gray-600">
                  No schemes found for the selected filters.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Alert className="mt-8 bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-gray-700">
          💡 <span className="font-semibold">Pro Tip:</span> Check which schemes apply to your farming needs!
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default GovernmentSchemesFinder;
