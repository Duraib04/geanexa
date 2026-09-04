import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import {
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  Banknote,
  Package,
  Navigation,
  Loader2,
} from 'lucide-react';

interface StoreLocation {
  latitude: number;
  longitude: number;
  address: string;
  district: string;
  state: string;
  pincode: string;
}

interface CooperativeStore {
  id: string;
  name: string;
  type: 'kootturam_sangam' | 'fcs' | 'cooperative' | 'agri_input_store';
  location: StoreLocation;
  contact: {
    phone: string;
    email: string;
    manager: string;
  };
  services: string[];
  products: string[];
  openingHours: {
    weekdays: string;
    weekend: string;
  };
  distance?: number;
}

interface StoreFarm {
  latitude: number;
  longitude: number;
}

export const CooperativeStoresLocator: React.FC = () => {
  const { t } = useLanguage();
  const [stores, setStores] = useState<CooperativeStore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<StoreFarm | null>(null);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [selectedStoreType, setSelectedStoreType] = useState('all');
  const [searchRadius, setSearchRadius] = useState(50);

  const defaultLocation = {
    latitude: 11.1271,
    longitude: 78.1561,
  };

  const storeTypes = [
    { id: 'all', label: 'All Stores' },
    { id: 'kootturam_sangam', label: 'Kootturam Sangam' },
    { id: 'fcs', label: 'FCS' },
    { id: 'cooperative', label: 'Cooperative' },
    { id: 'agri_input_store', label: 'Input Store' },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationLoaded(true);
          fetchStores(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setUserLocation(defaultLocation);
          setLocationLoaded(true);
          fetchStores(defaultLocation.latitude, defaultLocation.longitude);
        }
      );
    } else {
      setUserLocation(defaultLocation);
      setLocationLoaded(true);
      fetchStores(defaultLocation.latitude, defaultLocation.longitude);
    }
  }, [searchRadius, selectedStoreType]);

  const getSampleStores = (lat: number, lon: number): CooperativeStore[] => {
    const sampleStores: CooperativeStore[] = [
      {
        id: '1',
        name: 'Salem Kootturam Sangam',
        type: 'kootturam_sangam',
        location: {
          latitude: 11.6643,
          longitude: 78.1460,
          address: 'Fort Main Road, Salem',
          district: 'Salem',
          state: 'Tamil Nadu',
          pincode: '636001'
        },
        contact: {
          manager: 'Mr. Kumar',
          phone: '+91-427-2445566',
          email: 'salem.ks@tncooperative.gov.in'
        },
        services: ['Subsidized Seeds', 'Fertilizers', 'Agricultural Tools'],
        products: ['Rice Seeds', 'Vegetable Seeds', 'NPK Fertilizers', 'Urea'],
        openingHours: {
          weekdays: '9:00 AM - 5:30 PM',
          weekend: '9:00 AM - 1:00 PM'
        },
        distance: 12.5
      },
      {
        id: '2',
        name: 'Erode Farmers Cooperative Society',
        type: 'fcs',
        location: {
          latitude: 11.3410,
          longitude: 77.7172,
          address: 'Perundurai Road, Erode',
          district: 'Erode',
          state: 'Tamil Nadu',
          pincode: '638001'
        },
        contact: {
          manager: 'Mr. Prakash',
          phone: '+91-424-2255443',
          email: 'erode.fcs@tncooperative.gov.in'
        },
        services: ['Subsidized Seeds', 'Fertilizers', 'Pesticides', 'Soil Testing'],
        products: ['Cotton Seeds', 'Turmeric Seeds', 'DAP', 'Potash'],
        openingHours: {
          weekdays: '9:00 AM - 6:00 PM',
          weekend: '9:00 AM - 2:00 PM'
        },
        distance: 28.3
      },
      {
        id: '3',
        name: 'Namakkal Agricultural Cooperative',
        type: 'cooperative',
        location: {
          latitude: 11.2189,
          longitude: 78.1677,
          address: 'Tiruchengode Road, Namakkal',
          district: 'Namakkal',
          state: 'Tamil Nadu',
          pincode: '637001'
        },
        contact: {
          manager: 'Mr. Anandan',
          phone: '+91-4286-222334',
          email: 'namakkal.coop@tncooperative.gov.in'
        },
        services: ['Subsidized Seeds', 'Bio-Fertilizers', 'Farming Equipment Rental'],
        products: ['Paddy Seeds', 'Groundnut Seeds', 'Organic Manure', 'Micronutrients'],
        openingHours: {
          weekdays: '8:30 AM - 5:30 PM',
          weekend: '9:00 AM - 1:00 PM'
        },
        distance: 35.7
      }
    ];

    // Filter by type if not 'all'
    if (selectedStoreType !== 'all') {
      return sampleStores.filter(store => store.type === selectedStoreType);
    }
    return sampleStores;
  };

  const fetchStores = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: functionError } = await supabase.functions.invoke('cooperative-store-locator', {
        body: {
          latitude,
          longitude,
          radiusKm: searchRadius,
          type: selectedStoreType === 'all' ? 'all' : selectedStoreType,
        },
      });

      if (functionError) throw functionError;
      setStores(data.stores || []);
    } catch (err) {
      // Fallback to sample data when edge function is not available
      console.log('Using sample stores data - Supabase edge function not available');
      const sampleStores = getSampleStores(latitude, longitude);
      setStores(sampleStores);
    } finally {
      setLoading(false);
    }
  };

  const getStoreTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      kootturam_sangam: 'bg-green-100 text-green-800',
      fcs: 'bg-blue-100 text-blue-800',
      cooperative: 'bg-orange-100 text-orange-800',
      agri_input_store: 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getStoreTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      kootturam_sangam: 'Kootturam Sangam',
      fcs: 'Farm Cooperative Society',
      cooperative: 'Agricultural Cooperative',
      agri_input_store: 'Input Store',
    };
    return labels[type] || type;
  };

  const StoreCard: React.FC<{ store: CooperativeStore }> = ({ store }) => {
    const openGoogleMaps = () => {
      const mapsUrl = `https://maps.google.com/?q=${store.location.latitude},${store.location.longitude}`;
      window.open(mapsUrl, '_blank');
    };

    return (
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg mb-4">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg">{store.name}</CardTitle>
                <Badge className={getStoreTypeColor(store.type)}>
                  {getStoreTypeLabel(store.type)}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm">
                {store.distance !== undefined && (
                  <span className="text-green-600 font-semibold">
                    📍 {store.distance.toFixed(1)} km away
                  </span>
                )}
                <span className="text-gray-600">
                  {store.location.district}, {store.location.state}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Location</p>
              <p className="text-sm text-gray-600">{store.location.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t">
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <a href={`tel:${store.contact.phone}`} className="text-sm text-blue-600 hover:underline">
                  {store.contact.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm font-semibold">Opening Hours</p>
              <p className="text-sm text-gray-600">Weekdays: {store.openingHours.weekdays}</p>
              <p className="text-sm text-gray-600">Weekend: {store.openingHours.weekend}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-green-500" />
              <p className="text-sm font-semibold">Available Products</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {store.products.map((product, idx) => (
                <Badge key={idx} variant="secondary">
                  {product}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <div className="flex gap-2">
              <Banknote className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-yellow-900">Government Subsidies</p>
                <ul className="text-sm text-yellow-800 mt-1 space-y-1">
                  <li>• Seeds: 40-50% subsidy on certified seeds</li>
                  <li>• Fertilizers: Urea ₹242/bag, DAP ₹1,400/bag</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-2 flex-1"
              onClick={openGoogleMaps}
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 flex-1"
              onClick={() => window.open(`tel:${store.contact.phone}`)}
            >
              <Phone className="w-4 h-4" />
              Call Store
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">🏪 Nearby Government Stores</CardTitle>
          <CardDescription className="text-base">
            Find cooperative stores to buy subsidized seeds and fertilizers
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filter Stores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Search Radius: <span className="text-green-600">{searchRadius} km</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Filter by Store Type</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {storeTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedStoreType(type.id)}
                  className={`p-2 rounded-md text-sm font-medium transition-all ${
                    selectedStoreType === type.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
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
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-2" />
          <p className="text-gray-600">Finding nearby stores...</p>
        </div>
      )}

      {!loading && (
        <>
          {stores.length > 0 ? (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Found {stores.length} Store{stores.length !== 1 ? 's' : ''}
                </h3>
              </div>
              <div className="space-y-4">
                {stores.map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))}
              </div>
            </div>
          ) : (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="pt-6">
                <p className="text-center text-gray-600">
                  No stores found within {searchRadius} km. Try increasing search radius.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default CooperativeStoresLocator;
