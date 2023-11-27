import {Subscription} from '../../models';

// Route to create a new subscription
export const createSub = async (req, res) => {
    try {
        // Extract fields from the request body
        const {
            name,
            email,
            phone,
            subscriptionType,
            subscriptionDuration,
            subscriptionPaymentMethod,
        } = req.body;

        // Calculate subscription amount based on type and duration (you may need more complex logic)
        const subscriptionAmount = calculateSubscriptionAmount(subscriptionType, subscriptionDuration);

        // Set subscription date to the current time
        const subscriptionDate = new Date();

        // Set initial payment status based on whether the user has chosen a payment method
        const subscriptionPaymentStatus = subscriptionPaymentMethod ? 'Pending' : 'Not Applicable';

        // Set initial payment date based on whether the user has paid
        const subscriptionPaymentDate = subscriptionPaymentStatus === 'Pending' ? null : subscriptionDate;

        // Create a new subscription instance
        const newSubscription = new Subscription({
            name,
            email,
            phone,
            subscriptionType,
            subscriptionDuration,
            subscriptionAmount,
            subscriptionDate,
            subscriptionPaymentMethod,
            subscriptionPaymentStatus,
            subscriptionPaymentDate,
        });

        // Save the subscription to the database
        const savedSubscription = await newSubscription.save();

        // Respond with the saved subscription
        res.status(201).json(savedSubscription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function calculateSubscriptionAmount(subscriptionType, subscriptionDuration) {
    // Define type amounts
    const typeAmounts = {
        'Basic': 50,
        'Premium': 100,
        'Gold': 150,
        'Diamond': 200
    };

    // Define duration multipliers
    const durationMultipliers = {
        '3 months': 1.0,
        '6 months': 0.9,
        '1 year': 0.8,
        '2 years': 0.7,
        '5 years': 0.6,
        '10 years': 0.5
    };

    // Get the type amount and duration multiplier
    const typeAmount = typeAmounts[subscriptionType] || 0;
    const durationMultiplier = durationMultipliers[subscriptionDuration] || 0;

    // Calculate the subscription amount
    const calculatedAmount = typeAmount * durationMultiplier;

    return calculatedAmount;
}

// Route to get all subscriptions
export const getSubs = async (req, res) => {
    try {
        // Pagination and sorting options
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort: { subscriptionDate: -1 } // Sort by subscriptionDate in descending order
        };

        // Fetch subscriptions from the database with pagination and sorting
        const subscriptions = await Subscription.paginate({}, options);

        // Respond with paginated subscriptions
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Route to get a subscription by id
export const getSubById = async (req, res) => {
    try {
        // Extract subscription id from the request params
        const { id } = req.params;

        // Fetch subscription from database
        const subscription = await Subscription.findById(id);

        // Respond with subscription
        res.status(200).json(subscription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Route to update a subscription 
export const updateSub = async (req, res) => {
    try {
        // Extract subscription id from the request params
        const { id } = req.params;

        // Fetch subscription from database
        const subscription = await Subscription.findById(id);
  
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        // Extract fields to update from the request body
        const {
            name,
            email,
            phone,
            subscriptionType,
            subscriptionDuration,
            subscriptionPaymentMethod,
        } = req.body;

        // Calculate subscription amount based on type and duration (you may need more complex logic)
        const subscriptionAmount = calculateSubscriptionAmount(subscriptionType, subscriptionDuration);

        // Set subscription date to the current time
        const subscriptionDate = new Date();

        // Set initial payment status based on whether the user has chosen a payment method
        const subscriptionPaymentStatus = subscriptionPaymentMethod ? 'Pending' : 'Not Applicable';

        // Set initial payment date based on whether the user has paid
        const subscriptionPaymentDate = subscriptionPaymentStatus === 'Pending' ? null : subscriptionDate;

        // Update the subscription
        const updatedSubscription = await Subscription.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            subscriptionType,
            subscriptionDuration,
            subscriptionAmount,
            subscriptionDate,
            subscriptionPaymentMethod,
            subscriptionPaymentStatus,
            subscriptionPaymentDate,
        }, { new: true });

        // Respond with updated subscription
        res.status(200).json(updatedSubscription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateSubStatus = async (req, res) => {
    try {
        // Extract subscription id from the request params
        const { id } = req.params;

        // Fetch subscription from database
        const subscription = await Subscription.findById(id);
  
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        // Extract fields to update from the request body
        const {
            subscriptionStatus,
            subscriptionPaymentStatus,
        } = req.body;

        // Update the subscription
        const updatedSubscription = await Subscription.findByIdAndUpdate(id, {
            subscriptionStatus,
            subscriptionPaymentStatus,
        }, { new: true });

        // Respond with updated subscription
        res.status(200).json(updatedSubscription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


