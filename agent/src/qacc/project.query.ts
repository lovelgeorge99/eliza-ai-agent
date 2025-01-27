export const GET_ALL_PROJECTS = `
{
  allProjects(includeAllProjectStatuses: true, includeAllReviewStatuses: true,sortingBy:Newest) {
     projects {
    id
    title
    balance
    image
    slug
    description
    descriptionSummary
    creationDate
    updatedAt
    teaser
    adminUserId
    description
    walletAddress
    impactLocation
    qualityScore
    verified
    traceCampaignId
    listed
    reviewStatus
    givingBlocksId
    status {
      id
      symbol
      name
      description
    }
    categories {
      name
      mainCategory {
        title
        slug
        banner
        description
      }
    }
    reaction {
      id
    }
    adminUser {
      id
      email
      firstName
      walletAddress
    }
    organization {
      name
      label
      supportCustomTokens
    }
    addresses {
      address
      isRecipient
      networkId
      chainType
    }
    qfRounds {
      name
      isActive
      id
      maximumReward
    }
    totalReactions
    totalDonations
    totalTraceDonations
    sumDonationValueUsdForActiveQfRound
    countUniqueDonorsForActiveQfRound
    countUniqueDonors
    batchNumbersWithSafeTransactions
    estimatedMatching{
       projectDonationsSqrtRootSum
       allProjectsSum
       matchingPool
    }
    icon
    abc {
      tokenName
      tokenTicker
      issuanceTokenAddress
      icon
      orchestratorAddress
      projectAddress
      creatorAddress
      nftContractAddress
      chainId
      fundingManagerAddress
    }
  }
    totalCount
  }
}`;

export const GET_PROJECT_BY_SLUG = `
 query
      (
      $slug:String!
      )
{
		projectBySlug(
			slug: $slug
		) {
			__typename
			id
			title
			image
      icon
			slug
			verified
			totalDonations
			description
      teaser
      batchNumbersWithSafeTransactions
			addresses {
				address
				isRecipient
				networkId
				chainType
			}
      teamMembers {
      name
      image
      twitter
      linkedin
      farcaster
    }
			socialMedia {
				type
				link
			}
			totalProjectUpdates
			creationDate
			reaction {
				id
				userId
			}
			categories {
				name
				value
				mainCategory {
					title
				}
			}
			adminUser {
				id
				name
				walletAddress
				avatar
			}
			listed
			status {
				id
				name
			}
			organization {
				name
				label
				supportCustomTokens
			}
			verificationFormStatus
			givbackFactor
			sumDonationValueUsdForActiveQfRound
			countUniqueDonorsForActiveQfRound
			countUniqueDonors
			estimatedMatching {
				projectDonationsSqrtRootSum
				allProjectsSum
				matchingPool
			}
      abc {
      tokenName
      tokenTicker
      tokenPrice
      totalSupply
      issuanceTokenAddress
      icon
      orchestratorAddress
      projectAddress
      creatorAddress
      nftContractAddress
      chainId
      fundingManagerAddress
    }
			campaigns {
				id
				title
			}
		}
	}
`;
